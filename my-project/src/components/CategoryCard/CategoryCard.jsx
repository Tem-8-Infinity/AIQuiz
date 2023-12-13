import React from "react";
import { useNavigate } from "react-router-dom";
import { categoryIconsEnum } from "../../common/enums/category-icons-enum.js";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const selectCategoryHandler = () => {
    navigate(`/DisplayQuizes`, { state: { category } });
  };

  return (
    <div
      onClick={() => selectCategoryHandler()}
      role="button"
      className="text__card rounded flex gap-2 items-center flex-grow justify-center bg-gradient-to-br from-blue-500 to-teal-200 transition ease-in-out duration-[700ms] hover:shadow-2xl p-2 h-[250px]"
    >
      <h1 className="font-bold text-4xl">{category}</h1>
      <img
        src={categoryIconsEnum[category]}
        className="w-[80px] bg-white rounded-box "
      ></img>
    </div>
  );
};

export default CategoryCard;
