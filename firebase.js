import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs,doc, getDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyChD1BdwijgZpEnLd1hJUtHEL3jn6zig4g",
    authDomain: "trabajo-final-front-end.firebaseapp.com",
    projectId: "trabajo-final-front-end",
    storageBucket: "trabajo-final-front-end.appspot.com",
    messagingSenderId: "429902548593",
    appId: "1:429902548593:web:48cad7e2529c67a58355d0"
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);

 

export const getProducts=async()=>{
const querySnapshot = await getDocs(collection(database, "products"));
const products = []

querySnapshot.forEach((doc) => {
  products.push(doc)
})
return products
}


export const getProduct=async (id)=>{
const docRef = doc(database, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap;
} else {
  console.log("No such document!");
}    
}


