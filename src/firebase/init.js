// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAePZ4FYO6QTzxAJaoxF8_L7HKXn00g3vo',
    authDomain: 'blog-ia.firebaseapp.com',
    projectId: 'blog-ia',
    storageBucket: 'blog-ia.appspot.com',
    messagingSenderId: '578515476966',
    appId: '1:578515476966:web:ecfba95aa5cce1cc907627',
    measurementId: 'G-Q51L3ZDETD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const timestamp = getFirestore().FieldValue.serverTimestamp;

// export { timestamp };
export default getFirestore(app);
export { app };