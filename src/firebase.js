// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    //code snipet from Firebase project settings (config)
    apiKey: "AIzaSyC1BjW_YUq1bjeiRELd6IbooaVwlthVH4Q",
    authDomain: "todo-app-react-6f202.firebaseapp.com",
    projectId: "todo-app-react-6f202",
    storageBucket: "todo-app-react-6f202.appspot.com",
    messagingSenderId: "594152625186",
    appId: "1:594152625186:web:af62442c22bf0b6668267b",
    measurementId: "G-HG0R19XG1Y"
  });

  const db = firebaseApp.firestore();

  export default db;