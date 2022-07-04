
import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
var firebaseConfig = {
  apiKey: "AIzaSyDRtzgqKmJdU0G4SoudtokTB6zvAsT7SzM",
  authDomain: "halan-ffb3e.firebaseapp.com",
  projectId: "halan-ffb3e",
  storageBucket: "halan-ffb3e.appspot.com",
  messagingSenderId: "576171568518",
  appId: "1:576171568518:web:0d309555a61d60db495007",
  measurementId: "G-Z690PEV241"
}

const apps = getApps()
if (!apps.length) {
   var firebaseApp = initializeApp(firebaseConfig)
} else {
   var firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp);

export { db }
