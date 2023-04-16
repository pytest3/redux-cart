import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS109RTcVYmQjWpqu5IQ3wp7oz0hBcVqM",
  authDomain: "redux-try2.firebaseapp.com",
  databaseURL:
    "https://redux-try2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "redux-try2",
  storageBucket: "redux-try2.appspot.com",
  messagingSenderId: "1072781184818",
  appId: "1:1072781184818:web:443ee1c499c970ac49d12b",
  measurementId: "G-C0S9VRMF1K",
};

const app = initializeApp(firebaseConfig);

//get auth tells firebase that app is using authentication
export const auth = getAuth(app);
