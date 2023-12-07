import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const selectCategoryHandler = () => {
    navigate(`/DisplayQuizes`, { state: { category } });
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <div className="card-body items-center text-center p-6">
        <h2 className="card-title text-2xl mb-4 text-black font-bold">{category}</h2>
        <div className="card w-64 h-50 shadow-md rounded bg-gradient-to-br from-blue-500 to-teal-200">
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
                className="btn btn-primary text-2xl font-bold"
              >
                {category}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

<div className="card w-64 h-50 shadow-md rounded bg-gradient-to-br from-blue-500 to-teal-200"></div>;
