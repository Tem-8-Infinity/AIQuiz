import {
    equalTo,
    get,
    orderByChild,
    query,
    ref,
    remove,
    set,
    update,
    onValue,
    child
  } from "firebase/database";
  import { db } from "../config/firebase-config";
  
export const getAllQuizzes = async () =>{
    //Query to retrieve all the quezzes from db
    const snapshot = await get(query(ref(db, '/quizes')));
    // If we have quizzes map over all the keys and return the values
    if(snapshot.exists()){
        return(
            // snapshot.val()  === {}
            Object.keys(snapshot.val()).map((key,index) => ({...snapshot.val()[key], id:index})) 
        )
    }else{
        return(
            []
        )
    }
}