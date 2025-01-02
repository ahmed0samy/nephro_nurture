import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2IxKB6JTqNG_MZqSfY_VZxndn4n3i0i0",
  authDomain: "nephronurture.firebaseapp.com",
  databaseURL: "https://nephronurture-default-rtdb.firebaseio.com",
  projectId: "nephronurture",
  storageBucket: "nephronurture.firebasestorage.app",
  messagingSenderId: "129000114448",
  appId: "1:129000114448:web:21dfb80db9d41810f63d95",
  measurementId: "G-60BFLTKQMQ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
