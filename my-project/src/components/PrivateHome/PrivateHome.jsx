import React, { useState, useEffect } from 'react'
import CategoryCard from '../CategoryCard/CategoryCard';


const PrivateHome = () => {
    const categories = ["All Categories", "Science", "Books","Mythology","History", "Sport", "Education","Home","Training"]

  return (
  <div className='grid grid-cols-5  '>
    {categories.map((category) => <CategoryCard key={category} category={category}/>)}
</div>
  )
}

export default PrivateHome;