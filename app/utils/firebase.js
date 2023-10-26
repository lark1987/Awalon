import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxqIh646KLtao8XnKfJc6Lk0P1V1CQzYc",
  authDomain: "wehelpthree-lark1987.firebaseapp.com",
  projectId: "wehelpthree-lark1987",
  storageBucket: "wehelpthree-lark1987.appspot.com",
  messagingSenderId: "716508795071",
  appId: "1:716508795071:web:78297146c3ec13b083360a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);