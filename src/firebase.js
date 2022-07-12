// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "Firebase/auth"
import { collection, query, where,
  doc, addDoc, getDocs, getFirestore,
  serverTimestamp, deleteDoc } 
  from "Firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "sveltesuccinctlyapp.firebaseapp.com",
  projectId: "sveltesuccinctlyapp",
  storageBucket: "sveltesuccinctlyapp.appspot.com",
  messagingSenderId: "209...",
  appId: "1:20..."
}

let app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);
const favCollection = collection(db, "favs");
const userDoc = (userId) => doc(db, "users", userId);
const favDoc = (id) => doc(db, "favs", id)

const delFav = async(id) => {
  await deleteDoc(favDoc(id))
}

const addFav = async(book) => {
  const q = query(collection(db, "favs"), 
    where("title", "==", book.title),
    where("owner", "==", auth?.currentUser?.uid))
  const querySnapshot = await getDocs(q)
  
  if (querySnapshot?.docs?.length === 0) {
    await addDoc(favCollection, {...book, 
      owner: auth.currentUser.uid, 
      timestamp: serverTimestamp()})
  }
}

const getFavs = async() => {
  let books = []
  let fv = collection(db, "favs")

  if (auth?.currentUser?.uid !== undefined) {
    const q = query(fv, where("owner", "==", 
      auth?.currentUser?.uid))
    
    const snapshot = await getDocs(q)
    books = snapshot.docs.map(doc => {
        return {
            ...doc.data(),
            uuid: doc.id
        }
    })
  }
  
  return books
}

export {
    auth,
    db,
    favCollection,
    userDoc,
    favDoc,
    addFav,
    getFavs,
    delFav
}