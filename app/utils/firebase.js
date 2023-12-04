import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();
console.log(process.env.NEXT_PUBLIC_API_KEY)

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAxqIh646KLtao8XnKfJc6Lk0P1V1CQzYc",
//   authDomain: "wehelpthree-lark1987.firebaseapp.com",
//   projectId: "wehelpthree-lark1987",
//   storageBucket: "wehelpthree-lark1987.appspot.com",
//   messagingSenderId: "716508795071",
//   appId: "1:716508795071:web:78297146c3ec13b083360a"
// };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);