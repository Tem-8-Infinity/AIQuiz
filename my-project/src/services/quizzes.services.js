import { API_URL } from "./constants";

export const getQuizQuestions = async (amount, category, difficulty, type) => {
  const url = new URL(`${API_URL}api.php`);

  // Set query parameters
  url.searchParams.set('amount', amount || 10); // Default amount is 10
  if (category) url.searchParams.set('category', category);
  if (difficulty) url.searchParams.set('difficulty', difficulty);
  if (type) url.searchParams.set('type', type); // type can be 'multiple' or 'boolean'

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error('Failed to fetch quiz questions');
    }

    return data.results; // Return the questions

  } catch (e) {
    alert(e.message);
  }
}