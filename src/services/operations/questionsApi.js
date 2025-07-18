import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";

const { ADD_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } = courseEndpoints;

export function addQuestion(
  {
    subSectionId,
    questionText,
    questionType,
    options, // only for MCQ
    correctOptionIndex, // only for MCQ
    correctAnswer, // only for WRITTEN or NUMERIC
    points,
    explanation,
  },
  token
) {
  return async () => {
    try {
      const body = {
        subSectionId,
        questionText,
        questionType,
        points,
        explanation,
      };

      if (questionType === "MCQ") {
        body.options = options;
        body.correctOptionIndex = correctOptionIndex;
      } else if (questionType === "NUMERIC" || questionType === "WRITTEN") {
        body.correctAnswer = correctAnswer;
      }

      const response = await apiConnector("POST", ADD_QUESTION, body, {
        Authorization: `Bearer ${token}`,
      });

      if (response.status !== 201) {
        throw new Error("Failed to add question");
      }

      toast.success("Question added successfully");
      return response.data.question;
    } catch (error) {
      toast.error("Failed to add question");
    }
  };
}

export function updateQuestion(
  {
    questionId,
    questionText,
    questionType,
    options, // only for MCQ
    correctOptionIndex, // only for MCQ
    correctAnswer, // for written or numeric
    points,
    explanation,
  },
  token
) {
  return async () => {
    try {
      const body = {
        questionId,
        questionText,
        questionType,
        points,
        explanation,
      };

      if (questionType === "MCQ") {
        body.options = options;
        body.correctOptionIndex = correctOptionIndex;
      } else if (questionType === "NUMERIC" || questionType === "WRITTEN") {
        body.correctAnswer = correctAnswer;
      }

      const response = await apiConnector("PUT", UPDATE_QUESTION, body, {
        Authorization: `Bearer ${token}`,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update question");
      }

      toast.success("Question updated successfully");
      return response.data.question;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update question");
    }
  };
}

export function deleteQuestion({ questionId, subSectionId }, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_QUESTION,
        {
          questionId,
          subSectionId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete question");
      }

      toast.success("Question deleted successfully");
      return questionId;
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };
}

// Submit Single Question
export function submitQuestion({ questionId, userAnswer }, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.SUBMIT_QUESTION,
        { questionId, userAnswer },
        { Authorization: `Bearer ${token}` }
      );

      return response.data;
    } catch (error) {
      toast.error("Failed to submit question");
    }
  };
}
