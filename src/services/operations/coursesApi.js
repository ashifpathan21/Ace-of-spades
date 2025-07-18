import { apiConnector } from "../apiConnector";
import { categories, courseEndpoints } from "../apis";
import { setCourse } from "../../Slices/workingCourseSlice";
import { getInstructorCourses } from "./instructorApi";
import toast from "react-hot-toast";
import { setCourses } from "../../Slices/courseSlice";

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
} = courseEndpoints;

const { CATEGORIES_API } = categories;

export function getAllCategories(navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", CATEGORIES_API);

      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories");
      }

      return response.data.data;
    } catch (error) {
      // //("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message);
    }
  };
}

export function createNewCourse(
  {
    courseName,
    courseDescription,
    whatYouWillLearn,
    price,
    category,
    status,
    thumbnail,
    instructions,
  },
  token
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_COURSE_API,
        {
          courseName,
          courseDescription,
          whatYouWillLearn,
          price,
          category,
          status,
          thumbnail,
          instructions,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories");
      }

      toast.success("Course Created ");
      const payload = response.data.data;
      dispatch(setCourse(payload));
      return response.data.data;
    } catch (error) {
      // //("COURSE_CATEGORY_API API ERROR............", error)
      toast.error("Something went wrong ");
    }
  };
}

//get all published courses ;
export function getAllCourses() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_ALL_COURSE_API);
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories");
      }
      const payload = response.data.data;

      // //(payload)
      await dispatch(setCourses(payload));
      return response.data.data;
    } catch (error) {
      // //("Get course   API ERROR............", error)
      toast.error("Something went wrong ");
    }
  };
}

export function getCourseDetailsInstructor({ courseId }, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        },
        { Authorization: `bearer ${token}` }
      );
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories");
      }
      const payload = response.data.data.courseDetails;

      return response.data.data.courseDetails;
    } catch (error) {
      // //("Get course   API ERROR............", error)
      toast.error("Something went wrong ");
    }
  };
}

//only to update status now
export function updateCourse({ courseId, updates }, token) {
  return async (dispatch) => {
    try {
      const responce = await apiConnector(
        "POST",
        EDIT_COURSE_API,
        {
          courseId,
          updates,
        },
        { Authorization: `bearer ${token}` }
      );

      // //(responce)
      if (!responce?.data.success) {
        throw new Error("Could not Fetch Course categories");
      }

      return responce.data.data;
    } catch (error) {
      // //(error)
    }

    dispatch(getInstructorCourses(token));
  };
}

export function delelteCourse(courseId, token) {
  return async (dispatch) => {
    try {
      // //(courseId)
      const responce = await apiConnector(
        "DELETE",
        DELETE_COURSE_API,
        {
          courseId,
        },
        { Authorization: `bearer ${token}` }
      );
      // //(responce )
      if (!responce?.status === 200) {
        throw new Error("Could not Fetch Course categories");
      }

      return;
    } catch (error) {
      toast.error(error.message);
    }
  };
}
