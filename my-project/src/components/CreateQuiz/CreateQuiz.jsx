import { useEffect, useState } from 'react';

const CreateQuiz = () => {
  const [quizDetails, setQuizDetails] = useState({
    category: 'Categories',
    title: '',
    timer: '',
    isPrivate: false,
  });

  const handleInputChange = (evt) => {
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      //evt.target.name = category
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleCreateQuiz = () => {
    // Implement the logic to create a quiz using quizDetails
    console.log('Quiz Created:', quizDetails);
  };

  const categories = ['Categories','Books','Films','Animals','History'];

  useEffect(()=>{
    console.log(quizDetails);
  },[quizDetails])
  return (
    <div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Content */}
          <h1>Create Quiz</h1>
          <div>
            <label>Category :</label>
            <select name='category' value={quizDetails.category}
              onChange={handleInputChange}
             className="select select-bordered w-full max-w-xs">
              
              {/* <option>Books</option>
              <option>Films</option>
              <option>Animals</option>
              <option>History</option>
               */}
               {categories.map((category, index) => { 
               if(index === 0){
                return(
                  <option disabled key={category}>{category}</option> 
                )
              }
              return(
                <option key={category}>{category}</option>
              )
              }
               )}
            </select>
      
          </div>
          <div>
            <label>Title :</label>
            <input value={quizDetails.title}
              onChange={handleInputChange} name='title'
              type="text" placeholder="Title of the quiz" className="input input-bordered w-full max-w-xs" />
          </div>
          <div>
            <label>Timer :</label>
            <input value={quizDetails.title}
              onChange={handleInputChange} name='title'
              type="text" placeholder="Set quiz timer" className="input input-bordered w-full max-w-xs" />
          </div>
          <div>
          <button className="btn btn-outline">Open</button>
          <button className="btn btn-outline">Private</button>
            {/* <label>Private:</label>
            <input
              type="checkbox"
              checked={quizDetails.isPrivate}
              onChange={() =>
                handleInputChange('isPrivate', !quizDetails.isPrivate)
              }
            /> */}
          </div>
          <div>
            <button className='btn btn-primary' onClick={handleCreateQuiz}>Create Questionnaire</button >
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz