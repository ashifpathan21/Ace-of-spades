import { useState, useEffect } from "react";
import { addQuestion, addOption, addCorrectOption, deleteQuestion } from "../../services/operations/coursesApi";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorCourses } from "../../services/operations/instructorApi";
import '../../index.css'
export default function QuestionForm(props) {
  const { courses } = useSelector((state) => state.instructorCourses);
  const { setQuestionModal, setSubsectionModal, courseId, sectionId, subsectionId } = props;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [step, setStep] = useState("question");
  const [option, setOption] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [reloadQuestions, setReloadQuestions] = useState(true);

  useEffect(() => {
    if (!reloadQuestions) return;

    const fetchQuestions = async () => {
      try {
        await dispatch(getInstructorCourses(token));
        const quest =
          courses
            .find((course) => course._id === courseId)?.courseContent
            .find((section) => section._id === sectionId)?.subSection
            .find((sub) => sub._id === subsectionId)?.questions || [];
        setQuestions(quest);
      } catch (error) {
        // console.error("Error fetching questions:", error);
      } finally {
        setReloadQuestions(false);
      }
    };

    fetchQuestions();
  }, [reloadQuestions]);

  function saveSubSection() {
    setSubsectionModal(false);
    setQuestionModal(false);
  }

  const addquestion = async () => {
    if (!currentQuestion.trim()) return;
    setWaiting(true);
    try {
      const question = await dispatch(addQuestion({ subSectionId: subsectionId, questionText: currentQuestion }, token));
      setQuestionId(question._id);
      setStep("options");
    } catch (error) {
      // console.log("Error adding question:", error);
      resetForm();
    }
    setWaiting(false);
  };

  const addoption = async () => {
    if (!option.trim() || options.length >= 4) return;
    setWaiting(true);
    try {
      await dispatch(addOption({ questionId, optionText: option }, token));
      setOptions([...options, option]);
      if (options.length === 3) setStep("correctOption");
      setOption("");
    } catch (error) {
      // console.log("Error adding option:", error);
      await deleteQuestionn(questionId);
      resetForm();
    }
    setWaiting(false);
  };

  const confirmCorrectOption = async () => {
    if (!correctOption.trim()) return;
    setWaiting(true);
    try {
      const response = await dispatch(addCorrectOption({ subSectionId: subsectionId, questionId, correctOption }, token));
      
        setReloadQuestions(true);
        resetForm();
      
    } catch (error) {
      // console.log("Error setting correct option:", error);
      await deleteQuestionn(questionId);
      resetForm();
    }
    setWaiting(false);
  };

  const deleteQuestionn = async (id) => {
    if (!id) return;
    setWaiting(true);
    try {
      await dispatch(deleteQuestion({ subSectionId: subsectionId, questionId: id }, token));
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (error) {
      // console.log("Error deleting question:", error);
    }
    setWaiting(false);
  };

  const resetForm = () => {
    setCurrentQuestion("");
    setOptions([]);
    setOption("");
    setCorrectOption("");
    setStep("question");
    setQuestionId("");
  };


if(waiting){
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <span className='loader'></span>
    </div>
  )
}

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Question Form</h1>

      {step === "question" && (
        <div className="flex flex-col items-center mb-6">
          <input
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Enter Question"
            className="w-full max-w-md border p-2 rounded mb-4"
          />
          <button
            onClick={addquestion}
            className={`px-4 py-2 rounded text-white ${waiting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={waiting}
          >
            {waiting ? "Creating..." : "Confirm"}
          </button>
        </div>
      )}

      {step === "options" && options.length < 4 && (
        <div className="flex flex-col items-center mb-6">
          <input
            placeholder={`Option ${options.length + 1}`}
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full max-w-md border p-2 rounded mb-4"
          />
          <button
            onClick={addoption}
            className={`px-4 py-2 rounded text-white ${waiting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={waiting}
          >
            {waiting ? "Creating..." : "Confirm"}
          </button>
        </div>
      )}

      {step === "correctOption" && (
        <div className="flex flex-col items-center mb-6">
          <input
            placeholder="Enter Correct Option"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="w-full max-w-md border p-2 rounded mb-4"
          />
          <button
            onClick={confirmCorrectOption}
            className={`px-4 py-2 rounded text-white ${waiting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
            disabled={waiting}
          >
            {waiting ? "Creating..." : "Confirm"}
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Questions Added</h2>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {waiting ? (
            <p>Loading...</p>
          ) : questions?.length <= 0 ? (
            <p>No Questions Found</p>
          ) : (
            questions?.map((q, index) => (
              <div key={q._id} className="p-4 border text-black bg-white rounded shadow-md relative">
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteQuestionn(q._id)}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
                <p>
                  <strong>Q{index + 1}:</strong> {q?.questionText}
                </p>
                <ul className="list-decimal list-inside mt-2">
                  {q?.options?.map((opt, i) => (
                    <li
                      key={i}
                      className={opt?.options === q?.correctOption?.options ? "text-green-500 font-bold" : ""}
                    >
                      {opt?.options}
                    </li>
                  ))}
                  <li className="list-none mt-2">
                    <strong>Ans:</strong> {q?.correctOption?.options}
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
        {questions?.length > 0 && (
          <button
            onClick={saveSubSection}
            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-6 hover:bg-green-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
