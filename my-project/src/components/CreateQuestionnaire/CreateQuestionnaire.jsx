import { child, get, push, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';


const CreateQuestionnaire = () => {
    const [points, setPoints] = useState(0);
    const [questions,setQuiestions] = useState([]);
    const {quizId} = useParams();
    console.log(quizId);
    useEffect(()=>{
      console.log(questions);
    },[questions]);
    useEffect(()=>{
    get(ref(db,`/quizes/${quizId}`)).then((snapshot)=>{
      console.log(snapshot.val());
      setQuiestions(snapshot.val().questions || []);
    })
    },[])
    return (
    <>
    <div>CreateQuestionnaire</div>
       
      {questions.map((question,id)=>{
        return (
            <React.Fragment key={id}>
          <div className='flex flex-col p-4'>
          <div className='flex items-center gap-2 mb-5 w-full '> {/* The Question */}
          <label htmlFor="">Question:</label><input value={question.question} onChange={(e)=>{setQuiestions((q)=>{
          return q.map((item,i)=>{
            if(i === id){
              return (
                {
                ...item,
                  question:e.target.value
                }
              )
            }
            else{
              return item;
            }
          })
          })}} type="text" placeholder="Write a question" className="input input-bordered w-full" />
          </div>
           <div className='flex flex-col gap-2 w-full'>{/* The Options */}
           <div className='ml-10 mb-2'>
            {question.options.map((options,e)=>{
              return (
                <React.Fragment key={e}>
                <div className='flex items-center gap-2 mb-5 w-full '> {/* The Question */}
                <label htmlFor="">Option:</label><input value={question.options[e]} onChange={(o)=>{
                  setQuiestions((q)=>{
                    return q.map((item,i)=>{
                      if(i === id){
                        return(
                         {
                          ...item,
                          options:item.options.map((p,j)=>{
                            if(j === e){
                              return(o.target.value)
                            }
                            else{
                              return p;
                            }
                          })
                         }
                        )
                      }
                      else{
                        return item;
                      }
                    })
                    
                  })
                }} type="text" placeholder="Write an option" className="input input-bordered w-full" />
                </div>
                </React.Fragment>
              )

            })}
            <button onClick={()=>{
              setQuiestions(q=>q.map((e,i)=>{
                if(i===id){
                  return({
                    ...e, 
                    options: [...e.options,'']
                  })
                }
                return e;
              }))
            }}> + Add Options</button>
            </div>         
         </div>
      </div>
      </React.Fragment>
        )
      })}
      <div>
      <button className='' onClick={()=>{
        setQuiestions([...questions,{
          id: questions.length,
          question: "",
          options: [""],
          correctAnswer: "",
          points: 0,
        }])
      }}>+ Add Question </button>
        </div>
      <button className='btn' onClick={async()=>{
        const data = {
          questions, 
        }
        await update(ref(db,`/quizes/${quizId}`),data)
      }}>Submit</button>
    </>
  )
}

export default CreateQuestionnaire;