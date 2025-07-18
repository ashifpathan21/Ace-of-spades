import { apiConnector } from "../apiConnector";
import { testEndpoints } from "../apis";
import toast from "react-hot-toast";

const { CREATE_TEST, UPDATE_TEST, DELETE_TEST } = testEndpoints;

// ✅ CREATE TEST
export function createTest(
  { title, courseId, totalTime, instructions },
  token
) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_TEST,
        {
          title,
          courseId,
          totalTime,
          instructions,
        },
        { Authorization: `Bearer ${token}` }
      );

      toast.success("Test Created");
      return response.data;
    } catch (error) {
      toast.error("Failed to create test");
      return null;
    }
  };
}

// ✅ UPDATE TEST
export function updateTest({ testId, updates }, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_TEST,
        {
          testId,
          updates,
        },
        { Authorization: `Bearer ${token}` }
      );

      toast.success("Test Updated");
      return response.data;
    } catch (error) {
      toast.error("Failed to update test");
      return null;
    }
  };
}

// ✅ DELETE TEST
export function deleteTest(testId, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_TEST,
        {
          testId,
        },
        { Authorization: `Bearer ${token}` }
      );

      toast.success("Test Deleted");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete test");
      return null;
    }
  };
}

// Submit Test
export function submitTest({ testId, answers }, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.SUBMIT_TEST,
        { testId, answers },
        { Authorization: `Bearer ${token}` }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to submit test");
    }
  };
}
