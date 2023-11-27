import React, { useState, useEffect } from 'react'
import { getAllQuizzes } from '../../services/quiz.services';
import CategoryCard from '../CategoryCard/CategoryCard';


const PrivateHome = () => {
    const categories = ["Books","Mythology","History", "Sport", "Education",]

  return (
  <div className='flex flex-gap '>
    {categories.map((category) => <CategoryCard key={category} category={category}/>)}
</div>
  )
}

export default PrivateHome