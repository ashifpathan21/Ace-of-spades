// services/operations/quizApi.js
import { apiConnector } from "../apiConnector";
import { quiz } from "../apis";
import toast from "react-hot-toast";
import { setQuizzes } from "../../Slices/quizSlice";

const { GET_QUIZ, GENERATE_QUIZ  } = quiz;

// 1️⃣ Generate a quiz (using AI)

export const generateQuiz = async (data, token) => {
  const toastId = toast.loading("Generating quiz...");
  let result = null;

  try {
    const response = await apiConnector("POST", GENERATE_QUIZ, data, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.success) {
      toast.success("Quiz generated");
      result = response?.data;
    } else {
      throw new Error(response?.data?.message || "Quiz generation failed");
    }
  } catch (error) {
    // console.error("Generate Quiz Error:", error);
    toast.error(error?.response?.data?.message || "Failed to generate quiz");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// ✅ Redux Thunk Action
export const getAllQuizzes = (filters = {}, token) => {
  return async (dispatch) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${GET_QUIZ}?${queryParams}`;
    let result = [];

    try {
      const response = await apiConnector("GET", url, null, {
        Authorization: `Bearer ${token}`,
      });

      if (response?.data?.success) {
        result = response.data.data;
        dispatch(setQuizzes(result)); // ✅ update redux
      } else {
        throw new Error("Unable to fetch quizzes");
      }
    } catch (error) {
      // console.error("Fetch Quizzes Error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch quizzes");
    }

    return result; // optional
  };
};

export const submitQuiz = ({quizId, answers}, token) => {
  return async () => {
    try {
      
      const response = await apiConnector(
        "POST",
        quiz.SUBMIT_QUIZ,
        { quizId, answers },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
  
      if (!response?.data?.success) {
        // console.log(response?.data)
        throw new Error("Quiz submission failed");
      }
  
      toast.success("Quiz submitted successfully");
      return response?.data; // submission result, score, etc.
    } catch (error) {
      // console.log("SUBMIT_QUIZ_ERROR:", error);
      toast.error("Could not submit quiz");
      return null;
    }
  };
};
