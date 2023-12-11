import React, { useState, useEffect } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const PrivateHome = () => {
  const categories = [
    "All",
    "Science",
    "Books",
    "Mythology",
    "History",
    "Sport",
    "Education",
    "Home",
    "Training",
    "Movies",
    "Math",
    "Animals",
    "TV Shows",
    "Anime",
    "Geography",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
      {categories.map((category) => (
        <CategoryCard key={category} category={category} />
      ))}
    </div>
  );
};

export default PrivateHome;
