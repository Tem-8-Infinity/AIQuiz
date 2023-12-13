export const selectBadgeColor = (difficulty) => {
  return difficulty === "Hard"
    ? "badge-secondary bg-red-600"
    : difficulty === "Medium"
      ? "badge-secondary bg-orange-600"
      : "badge-secondary bg-green-800";
};