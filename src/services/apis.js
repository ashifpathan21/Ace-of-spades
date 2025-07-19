const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  GET_SUGGESTIONS: BASE_URL + "/auth/suggestions",
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHECK_USERNAME: BASE_URL + "/auth/username",
  FIND_FRIEND: BASE_URL + "/auth/find-friend",
  SEND_REQUEST: BASE_URL + "/auth/add-friend",
  ACCEPT_REQUEST: BASE_URL + "/auth/accept-friend-request",
  REJECT_REQUEST: BASE_URL + "/auth/reject-friend-request",
  GET_REVIEW: BASE_URL + "/auth/support",
  SEND_MESSAGE: BASE_URL + "/auth/sendMessage",
  SEEN_MESSAGE: BASE_URL + "/auth/seenMessage",
  GET_COLLEGE: BASE_URL + "/location/",
  GET_SUGGESTIONS: BASE_URL + "/auth/suggestions",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
};

//test endpoints
// In apis.js or wherever you define API endpoints
export const testEndpoints = {
  CREATE_TEST: BASE_URL + "/course/test/create",
  UPDATE_TEST: BASE_URL + "/course/test/update",
  DELETE_TEST: BASE_URL + "/course/test/delete",
  SUBMIT_TEST: BASE_URL + "/course/test/submit", // already added earlier
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  SUBMIT_QUESTION: BASE_URL + "/course/submitQuestion",
  SUBMIT_TEST: BASE_URL + "/course/test/submit",
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  GET_INSTRUCTOR_TOP_COURSES: BASE_URL + "/course/getInstructorTopCourses",
  //questions
  ADD_QUESTION: BASE_URL + "/course/subsection/addQuestion",
  UPDATE_QUESTION: BASE_URL + "/course/subsection/updateQuestion",
  DELETE_QUESTION: BASE_URL + "/course/subsection/deleteQuestion",

  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
};

// apis/index.js
export const leaderboardEndpoints = {
  GET_LEADERBOARD_API: BASE_URL + "/getRank/leaderboard",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  GET_AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const quiz = {
  GENERATE_QUIZ : BASE_URL+'/quiz/generate',
  GET_QUIZ:BASE_URL+'/quiz/get-all',
  SUBMIT_QUIZ:BASE_URL+'/quiz/submit',
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  ADD_COURSE: BASE_URL + "/profile/enroll",
};
