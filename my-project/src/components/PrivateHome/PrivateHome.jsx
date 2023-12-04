import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const PrivateHome = () => {
  const categories = [
    "All Categories",
    "Books",
    "Mythology",
    "History",
    "Sport",
    "Education",
    "Home",
    "Training",
  ];

  return (
    <div className="carousel w-full">
      {categories.map((category, index) => (
        <CategoryCard key={category} category={category} index={index + 1} />
      ))}
    </div>
  );
};

export default PrivateHome;
