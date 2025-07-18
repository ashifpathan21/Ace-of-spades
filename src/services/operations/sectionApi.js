// sectionApi.js
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { setCourse } from "../../Slices/workingCourseSlice";
import toast from "react-hot-toast";

const {
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  LECTURE_COMPLETION_API,
  DELETE_SUBSECTION_API,
} = courseEndpoints;

// Create Section
export function createSection({ sectionName, courseId }, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_SECTION_API,
        {
          sectionName,
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not create section");
      }

      dispatch(setCourse(response.data.updatedCourse));
      toast.success("Section created");
      return response.data.updatedCourse;
    } catch (error) {
      toast.error("Failed to create section");
    }
  };
}

// Update Section
export function updateSection({ sectionName, sectionId, courseId }, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_SECTION_API,
        {
          sectionName,
          sectionId,
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not update section");
      }

      dispatch(setCourse(response.data.data));
      toast.success("Section updated");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to update section");
    }
  };
}

// Delete Section
export function deleteSection({ sectionId, courseId }, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        DELETE_SECTION_API,
        {
          sectionId,
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not delete section");
      }

      dispatch(setCourse(response.data.data));
      toast.success("Section deleted");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to delete section");
    }
  };
}

// Create SubSection
export function createSubSection(
  { sectionId, title, description, videoUrl },
  token
) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_SUBSECTION_API,
        {
          sectionId,
          title,
          description,
          videoUrl,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not create sub-section");
      }

      toast.success("Sub-section created");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to create sub-section");
    }
  };
}

// Update SubSection
export function updateSubSection(
  { sectionId, subSectionId, title, description, videoUrl },
  token
) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_SUBSECTION_API,
        {
          sectionId,
          subSectionId,
          title,
          description,
          videoUrl,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not update sub-section");
      }

      toast.success("Sub-section updated");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to update sub-section");
    }
  };
}

// Delete SubSection
export function deleteSubSection({ sectionId, subSectionId }, token) {
  return async () => {
    try {
      const response = await apiConnector(
        "POST",
        DELETE_SUBSECTION_API,
        {
          subSectionId,
          sectionId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error("Could not delete sub-section");
      }

      toast.success("Sub-section deleted");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete sub-section");
    }
  };
}

//for lecture complete
export function completeLecture(
  { courseId, subsectionId, correctQuestions },
  token
) {
  return async (dispatch) => {
    try {
      const responce = await apiConnector(
        "POST",
        LECTURE_COMPLETION_API,
        {
          courseId,
          subsectionId,
          correctQuestions,
        },
        { Authorization: `bearer ${token}` }
      );

      if (!responce?.status === 200) {
        throw new Error("Could not Complete Lecture");
      }

      return responce.data;
    } catch (error) {
      toast.error(error?.message);
    }
  };
}
