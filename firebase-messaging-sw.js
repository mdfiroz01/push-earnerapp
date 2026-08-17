importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDcQRdT-coeFTKp7WCRKed6m3J33jqUGT8",
  authDomain: "earning-ba86b.firebaseapp.com",
  databaseURL: "https://earning-ba86b-default-rtdb.firebaseio.com",
  projectId: "earning-ba86b",
  storageBucket: "earning-ba86b.firebasestorage.app",
  messagingSenderId: "852108051778",
  appId: "1:852108051778:web:4ef5d12fb398305b6cf4db"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  const title = notification.title || payload.data?.title || 'EarnerApp';
  const body = notification.body || payload.data?.body || '';

  self.registration.showNotification(title, {
    body,
    icon: notification.icon || '/favicon.ico',
    badge: notification.badge || '/favicon.ico',
    data: { url: payload.data?.url || '/' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) {
        client.navigate(url);
        return client.focus();
      }
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
