import React, { useState, useEffect } from 'react'
import { getAllQuizzes } from '../../services/quiz.services';


const PrivateHome = () => {
    const [quizzes, setQuizzes] = useState();
    useEffect(()=>{
        getAllQuizzes().then((data)=> setQuizzes(data) )
    },[])
    useEffect(()=>{
        console.log(quizzes);
    },[quizzes])
  return (
  <div className='flex '>
    <div className="card w-64 h-50 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title"><div className="badge badge-primary badge-lg"></div>
<div className="badge badge-primary badge-md"></div>
<div className="badge badge-primary badge-sm"></div>
<div className="badge badge-primary badge-xs"></div>
</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary text-2xl ">Books</button>
    </div>
    <p className='text-red-500' >Try It Out</p>
  </div>
</div>
<div className="card w-64 h-50 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title"><div className="badge badge-primary badge-lg"></div>
<div className="badge badge-primary badge-md"></div>
<div className="badge badge-primary badge-sm"></div>
<div className="badge badge-primary badge-xs"></div>
</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary text-2xl ">Books</button>
    </div>
  </div>
</div>

<div className="card w-64 h-50 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title"><div className="badge badge-primary badge-lg"></div>
<div className="badge badge-primary badge-md"></div>
<div className="badge badge-primary badge-sm"></div>
<div className="badge badge-primary badge-xs"></div>
</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary text-2xl ">Books</button>
    </div>
  </div>
</div>

<div className="card w-64 h-50 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title"><div className="badge badge-primary badge-lg"></div>
<div className="badge badge-primary badge-md"></div>
<div className="badge badge-primary badge-sm"></div>
<div className="badge badge-primary badge-xs"></div>
</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary text-2xl ">Books</button>
    </div>
  </div>
</div>

<div className="card w-64 h-50 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title"><div className="badge badge-primary badge-lg"></div>
<div className="badge badge-primary badge-md"></div>
<div className="badge badge-primary badge-sm"></div>
<div className="badge badge-primary badge-xs"></div>
</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary text-2xl ">Books</button>
    </div>
  </div>
</div>
</div>
  )
}

export default PrivateHome