import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const selectCategoryHandler = () => {
    navigate(`/DisplayQuizes`, { state: { category } });
  };
  return (
    <div className="card w-64 h-50 bg-third-color text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          <div className="badge badge-primary badge-lg"></div>
          <div className="badge badge-primary badge-md"></div>
          <div className="badge badge-primary badge-sm"></div>
          <div className="badge badge-primary badge-xs"></div>
        </h2>
        <div className="card-actions justify-end">
          <button
            onClick={() => selectCategoryHandler()}
            className="btn btn-primary text-2xl "
          >
            {category}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
