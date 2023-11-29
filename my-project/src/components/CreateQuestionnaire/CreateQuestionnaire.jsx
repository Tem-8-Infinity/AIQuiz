import React, { useState } from 'react'


const CreateQuestionnaire = () => {
    const [points, setPoints] = useState(0);
    const [questions,setQuiestions] = useState([]);
  return (
    <>
    <div>CreateQuestionnaire</div>
       
      {questions.map((question,id)=>{
        return (
            <>
          <div className='flex flex-col p-4'>
          <div className='flex items-center gap-2 mb-5 w-full '> {/* The Question */}
          <label htmlFor="">Question:</label><input type="text" placeholder="Write a question" className="input input-bordered w-5/6" />
          <input type="number" value={points} onChange={(e)=>setPoints(e.target.value)} placeholder="" className="input input-bordered w-20 " />
          </div>
           <div className='flex flex-col gap-2 w-full'>{/* The Options */}
           <div className='ml-10 mb-2'>
            {question.options.map((options,e)=>{
              return (
                <>
                <div className='flex items-center gap-2 mb-5 w-full '> {/* The Question */}
                <label htmlFor="">Option:</label><input type="text" placeholder="Write an option" className="input input-bordered w-full" />
                </div>
                </>
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
      </>
        )
      })}
      <button className='' onClick={()=>{
        setQuiestions([...questions,{
          id: questions.length,
          question: "",
          options: [""],
          correctAnswer: "",
          points: 0,
        }])
      }}>+ Add Question </button>
  
    </>

  )
}

export default CreateQuestionnaire;