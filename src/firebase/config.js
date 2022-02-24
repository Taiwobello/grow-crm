// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1U7xH4HSEDJO0xX7zIKQAGlL1frL0F7c",
  authDomain: "grow-crm-b7ded.firebaseapp.com",
  projectId: "grow-crm-b7ded",
  storageBucket: "grow-crm-b7ded.appspot.com",
  messagingSenderId: "858938845105",
  appId: "1:858938845105:web:05add971f781e9303f7f90",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

