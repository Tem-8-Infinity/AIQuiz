import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();
  const selectCategoryHandler = () => {
    navigate(`/DisplayQuizes`, { state: { category } });
  };

  const slideId = `slide${index}`;

  return (
    <div id={slideId} className="carousel-item relative w-full">
      <img src="https://example.com/image.jpg" className="w-full" />

      {/* Navigation Buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#${slideId - 1}`} className="btn btn-circle">❮</a>
        <a href={`#${slideId + 1}`} className="btn btn-circle">❯</a>
      </div>

      {/* Card Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button onClick={selectCategoryHandler} className="btn btn-primary text-2xl">
          {category}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
