"use client"
import { useRouter } from 'next/navigation';

const RoomIdPage = () => {

  const router = useRouter();

  const test=() => { 

    const pathName= window.location.pathname
    const pathParts = pathName.split('/');
    const lastPart = pathParts[pathParts.length - 1]; 

    console.log(lastPart)

    // const db = firebase.firestore();
    // const docRef = db.collection("Awalon-room").doc('your-document');
    // docRef.onSnapshot(function(doc) {
    // const data = doc.data();
    // });

   }




  return (
    <>
    <div>RoomIdPage</div><br/><br/>
    <button onClick={test}> TEST </button>
    </>
  )
}

export default RoomIdPage

