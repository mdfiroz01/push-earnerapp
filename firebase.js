// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcQRdT-coeFTKp7WCRKed6m3J33jqUGT8",
  authDomain: "earning-ba86b.firebaseapp.com",
  databaseURL: "https://earning-ba86b-default-rtdb.firebaseio.com",
  projectId: "earning-ba86b",
  storageBucket: "earning-ba86b.firebasestorage.app",
  messagingSenderId: "852108051778",
  appId: "1:852108051778:web:4ef5d12fb398305b6cf4db",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Global Firebase Services Reference (Auth & Realtime DB only)
const auth = firebase.auth();
const db = firebase.database();
