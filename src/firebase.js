import { initializeApp } from "firebase/app";
import { getFirestore ,collection , doc , setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  // apiKey: "AIzaSyAKAvmLRMPrZje5FjC-Qu0VOMieK3j_Cos",
  // authDomain: "crud-application-86a21.firebaseapp.com",
  // projectId: "crud-application-86a21",
  // storageBucket: "crud-application-86a21.appspot.com",
  // messagingSenderId: "282863878937",
  // appId: "1:282863878937:web:79119a9e81d4a8866bbb88",
  // measurementId: "G-RV6KDKBF2V"
  apiKey: "AIzaSyCpRCHWwKbEbPkZBAYgVplLwMYHzAFuC7s",
  authDomain: "crud-application-f9a51.firebaseapp.com",
  projectId: "crud-application-f9a51",
  storageBucket: "crud-application-f9a51.appspot.com",
  messagingSenderId: "487288762974",
  appId: "1:487288762974:web:fa80196129d4166fb6bacf",
  measurementId: "G-E4RTH8G7BF"
};

let app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

const user_collections = collection(db,'data')
const dbRef = getDatabase()

// const form_detail = []

export const createuser = user => {

  try
  {
      let x = Math.floor(1000 + Math.random() * 9000)
      let y = Math.floor(1000 + Math.random() * 9000)
      let obj = x + y
      
      setDoc(doc(db, "data", obj.toString()), user)            
      alert('Successfully Created')
  }
  catch(err)
  {   
      alert(err)
  }
}


