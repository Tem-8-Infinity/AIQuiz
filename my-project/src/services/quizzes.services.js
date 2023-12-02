// import { API_TOKEN, QUESTIONS_URL } from "./constants"
import { API_URL } from "./constants";

// export const getQuizQuestions = async (category, difficulty, limit) => {

//   if (!limit) {
//     limit = 20;
//   }

//   const queryParams = {
//     apiKey: API_TOKEN,
//     category,
//     difficulty,
//     limit
//   }

//   const url = _attachQueryParams(QUESTIONS_URL, queryParams);

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       const message = await response.json();

//       throw new Error(message);
//     }

//     const data = await response.json();

//     console.log(data);

//   } catch (e) {
//     alert(e.message);
//   }
// }

// const _attachQueryParams = (url, queryParams) => {
//   url += "?";

//   for (const key in queryParams) {
//     if (queryParams[key] !== undefined) {
//       url += `${key}=${queryParams[key]}&`
//     }
//   }

//   url = url.substring(0, url.length - 1)

//   return url;
// }

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

    console.log(data.results); // Log the quiz questions
    return data.results; // Return the questions

  } catch (e) {
    alert(e.message);
  }
}