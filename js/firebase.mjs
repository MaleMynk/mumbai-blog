/* import { initializeApp } from 'firebase/app';
 //import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHfYbXeXsT8bLUb_y5Gcz8qo8KlTdNELI",
  authDomain: "mumbai-blog.firebaseapp.com",
  projectId: "mumbai-blog",
  storageBucket: "mumbai-blog.appspot.com",
  messagingSenderId: "611018939988",
  appId: "1:611018939988:web:418140b656be64cd6a57c1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);


import firebase from "firebase/app";
firebase.initializeApp({apiKey: "AIzaSyDHfYbXeXsT8bLUb_y5Gcz8qo8KlTdNELI",
authDomain: "mumbai-blog.firebaseapp.com",
projectId: "mumbai-blog",
storageBucket: "mumbai-blog.appspot.com",
messagingSenderId: "611018939988",
appId: "1:611018939988:web:418140b656be64cd6a57c1"
});
*/
//import { initializeApp } from 'firebase/app';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //....
  apiKey: "AIzaSyDHfYbXeXsT8bLUb_y5Gcz8qo8KlTdNELI",
  authDomain: "mumbai-blog.firebaseapp.com",
  projectId: "mumbai-blog",
  storageBucket: "mumbai-blog.appspot.com",
  messagingSenderId: "611018939988",
  appId: "1:611018939988:web:418140b656be64cd6a57c1"

};

//firebase.firestore();
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
console.log(firebaseConfig.name);
//console.log("db defined");