export const fetchQuizzes = async (numberOfQuizzes: number) => {
  if (numberOfQuizzes < 1)
    throw "Invalid number of requested quizzes: " + numberOfQuizzes;
  try {
    const response = await fetch("/api/matches", { method: "post" });
    if (response.status !== 201) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
};
