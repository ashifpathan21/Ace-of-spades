import { useState, useEffect } from "react";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../services/operations/questionsApi";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorCourses } from "../../services/operations/instructorApi";

export default function QuestionForm(props) {
  const { courses } = useSelector((state) => state.instructorCourses);
  const {
    setQuestionModal,
    setSubsectionModal,
    courseId,
    sectionId,
    subsectionId,
  } = props;

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("MCQ");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [points, setPoints] = useState("");
  const [options, setOptions] = useState(["", ""]); // Two inputs by default
  const [correctOptionIndex, setCorrectOptionIndex] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [reloadQuestions, setReloadQuestions] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);

  useEffect(() => {
    if (!reloadQuestions) return;
    const fetchQuestions = async () => {
      try {
        await dispatch(getInstructorCourses(token));
        const quest =
          courses
            ?.find((course) => course._id === courseId)
            ?.courseContent?.find((section) => section._id === sectionId)
            ?.subSection?.find((sub) => sub._id === subsectionId)?.questions ||
          [];
        setQuestions(quest);
      } catch (error) {
        // console.error("Failed to fetch questions", error);
      } finally {
        setReloadQuestions(false);
      }
    };
    fetchQuestions();
  }, [reloadQuestions]);

  const resetForm = () => {
    setQuestionType("MCQ");
    setCurrentQuestion("");
    setPoints("");
    setOptions(["", ""]);
    setCorrectOptionIndex("");
    setCorrectAnswer("");
    setEditMode(false);
    setEditQuestionId(null);
  };

  const confirmAndSubmit = async () => {
    if (!currentQuestion.trim()) return;
    if (points < 2 || points > 10) setPoints(4);

    const payload = {
      questionText: currentQuestion,
      questionType,
      points,
      explanation: "",
    };

    if (questionType === "MCQ") {
      const filteredOptions = options
        .map((opt) => opt?.options?.trim() || opt?.trim())
        .filter(Boolean);
      if (filteredOptions.length < 2 || correctOptionIndex === "") return;
      payload.options = filteredOptions;
      payload.correctOptionIndex = parseInt(correctOptionIndex);
    } else {
      if (!correctAnswer.trim()) return;
      payload.correctAnswer = correctAnswer;
    }

    setWaiting(true);
    try {
      if (editMode) {
        payload.questionId = editQuestionId;
        await dispatch(updateQuestion(payload, token));
      } else {
        payload.subSectionId = subsectionId;
        await dispatch(addQuestion(payload, token));
      }
      setReloadQuestions(true);
      resetForm();
    } catch (error) {
      // console.error("Question save/update failed", error);
    }
    setWaiting(false);
  };

  const deleteQuestionn = async (id) => {
    setWaiting(true);
    try {
      await dispatch(
        deleteQuestion({ subSectionId: subsectionId, questionId: id }, token)
      );
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      // console.error("Delete failed", error);
    }
    setWaiting(false);
  };

  const handleEdit = (q) => {
    setEditMode(true);
    setEditQuestionId(q._id);
    setCurrentQuestion(q.questionText);
    setQuestionType(q.questionType);
    setPoints(q.points);
    if (q.questionType === "MCQ") {
      setOptions(q.options || ["", ""]);

      const index = q?.options?.findIndex(
        (opt) => q.correctOption?._id === opt._id
      );

      setCorrectOptionIndex(index);
    } else {
      setCorrectAnswer(q.correctAnswer || "");
    }
  };

  const saveSubSection = () => {
    setSubsectionModal(false);
    setQuestionModal(false);
  };

  const updateOption = (idx, val) => {
    const updated = [...options];
    updated[idx] = val;
    setOptions(updated);
  };

  const removeOption = (idx) => {
    const updated = options.filter((_, i) => i !== idx);
    setOptions(updated);
    if (correctOptionIndex === idx.toString()) setCorrectOptionIndex("");
  };

  const addNewOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md mt-10 shadow-cyan-500 ">
      <h1 className="text-2xl font-bold text-center mb-6">
        {editMode ? "Edit Question" : "Add Question"}
      </h1>

      {editMode && (
        <div className="mb-2 text-center text-red-500 font-semibold">
          Editing Mode –{" "}
          <span className="underline cursor-pointer" onClick={resetForm}>
            Cancel
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6 items-center">
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full text-slate-600 max-w-md border p-2 rounded"
        >
          <option value="MCQ">MCQ</option>
          <option value="NUMERIC">Numeric</option>
          <option value="WRITTEN">Written</option>
        </select>

        <input
          id="question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Enter Question"
          className="w-full max-w-md border p-2 rounded"
        />

        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          placeholder="Points (2-10)"
          min={2}
          max={10}
          className="w-full max-w-md border p-2 rounded"
        />
      </div>

      {questionType === "MCQ" && (
        <div className="flex flex-col items-center gap-4 mb-6 w-full">
          {options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center w-full max-w-md">
              <input
                value={opt?.options}
                onChange={(e) => updateOption(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="flex-grow border p-2 rounded"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(idx)}
                  className="text-red-500 text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {options.length < 4 && (
            <button
              onClick={addNewOption}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add Option
            </button>
          )}

          <select
            value={correctOptionIndex}
            onChange={(e) => setCorrectOptionIndex(e.target.value)}
            className="w-full max-w-md border p-2 rounded"
          >
            <option value="">Select Correct Option</option>
            {options.map((opt, idx) => (
              <option className="text-black " key={idx} value={idx}>
                {opt?.options || opt}
              </option>
            ))}
          </select>
        </div>
      )}

      {(questionType === "NUMERIC" || questionType === "WRITTEN") && (
        <div className="flex flex-col items-center mb-6">
          <input
            type={questionType === "NUMERIC" ? "number" : "text"}
            placeholder={`Correct Answer (${questionType})`}
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full max-w-md border p-2 rounded"
          />
        </div>
      )}

      <div className="flex justify-center mb-8">
        <button
          onClick={confirmAndSubmit}
          className={`px-6 py-2 rounded text-white ${
            waiting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={waiting}
        >
          {waiting
            ? editMode
              ? "Updating..."
              : "Saving..."
            : editMode
            ? "Update"
            : "Save"}
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Questions Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.length === 0 ? (
            <p>No Questions Found</p>
          ) : (
            questions.map((q, index) => (
              <div
                key={q?._id}
                className="p-4 shadow shadow-emerald-500 rounded relative"
              >
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteQuestionn(q?._id)}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
                <button
                  className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(q)}
                >
                  <i className="ri-edit-2-fill"></i>
                </button>
                <p>
                  <strong>Q{index + 1}:</strong> {q.questionText}
                </p>
                <p className="text-sm text-gray-500">Points: {q.points}</p>

                {q.questionType === "MCQ" && (
                  <ul className="list-decimal list-inside mt-2">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        className={
                          opt?.options === q.correctOption?.options
                            ? "text-green-600 font-semibold"
                            : ""
                        }
                      >
                        {opt?.options}
                      </li>
                    ))}
                  </ul>
                )}
                {(q.questionType === "NUMERIC" ||
                  q.questionType === "WRITTEN") && (
                  <p className="mt-2">
                    <strong>Ans:</strong> {q.correctAnswer}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
        <button
          onClick={saveSubSection}
          className="bg-green-600 text-white px-5 py-2 rounded-lg mt-6 hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
