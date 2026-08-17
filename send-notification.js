const admin = require('firebase-admin');

function getAdminApp() {
  if (admin.apps.length) return admin.app();

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://earning-ba86b-default-rtdb.firebaseio.com'
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const app = getAdminApp();
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing admin token' });
    }

    const idToken = authHeader.substring(7);
    const decoded = await app.auth().verifyIdToken(idToken);
    if (decoded.email !== 'admin@gmail.com' || decoded.email_verified !== true) {
      return res.status(403).json({ error: 'Admin access denied' });
    }

    const title = String(req.body?.title || '').trim();
    const body = String(req.body?.body || '').trim();
    if (!title || !body) return res.status(400).json({ error: 'Title and message are required' });

    const db = app.database();
    const snapshot = await db.ref('users').once('value');
    const users = snapshot.val() || {};

    const tokens = [];
    for (const uid of Object.keys(users)) {
      const fcmTokens = users[uid]?.fcmTokens || {};
      for (const key of Object.keys(fcmTokens)) {
        const token = fcmTokens[key]?.token || fcmTokens[key];
        if (typeof token === 'string' && token.length > 20) tokens.push(token);
      }
    }

    const uniqueTokens = [...new Set(tokens)];
    let sent = 0;
    let failed = 0;

    // FCM multicast supports up to 500 tokens per request.
    for (let i = 0; i < uniqueTokens.length; i += 500) {
      const batch = uniqueTokens.slice(i, i + 500);
      const result = await admin.messaging(app).sendEachForMulticast({
        tokens: batch,
        notification: { title, body },
        data: { title, body, url: '/' }
      });
      sent += result.successCount;
      failed += result.failureCount;

      // Remove invalid/unregistered tokens.
      const updates = {};
      result.responses.forEach((r, index) => {
        const code = r.error?.code || '';
        if (code.includes('registration-token-not-registered') ||
            code.includes('invalid-registration-token')) {
          for (const uid of Object.keys(users)) {
            const fcmTokens = users[uid]?.fcmTokens || {};
            for (const key of Object.keys(fcmTokens)) {
              const value = fcmTokens[key]?.token || fcmTokens[key];
              if (value === batch[index]) updates[`users/${uid}/fcmTokens/${key}`] = null;
            }
          }
        }
      });
      if (Object.keys(updates).length) await db.ref().update(updates);
    }

    return res.status(200).json({ ok: true, total: uniqueTokens.length, sent, failed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
