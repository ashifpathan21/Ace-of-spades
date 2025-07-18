import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { submitQuestion } from "../services/operations/questionsApi";

const TaskBox = ({ questions, onComplete }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [choose, setChoose] = useState("");
  const [correctOption, setCorrectOption] = useState(null);
  const [correctQuestions, setCorrectQuestions] = useState([]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const currentQuestion = questions[questionIndex];

  const match = async () => {
    if (!choose) return toast.error("Please select or write your answer");

    const toastId = toast.loading("Submitting...");
    try {
      const res = await dispatch(
        submitQuestion(
          {
            questionId: currentQuestion._id,
            userAnswer: choose,
          },
          token
        )
      );

      const correct =
        currentQuestion.correctOption || currentQuestion?.correctAnswer;
      toast.dismiss();
      if (currentQuestion.questionType === "MCQ" && res.isCorrect) {
        toast.success(`Correct! +${res?.score || 1} pts`, { id: toastId });
        setCorrectQuestions((prev) => [...prev, currentQuestion._id]);
        setCorrectOption(correct?.options);
      } else if (currentQuestion.questionType === "NUMERIC" && res.isCorrect) {
        toast.success(`Correct! +${res?.score || 1} pts`, { id: toastId });
        setCorrectQuestions((prev) => [...prev, currentQuestion._id]);
        setCorrectOption(correct);
      } else if (
        currentQuestion?.questionType === "WRITTEN" &&
        res?.isCorrect
      ) {
        toast.success(`Correct! +${res?.score || 1} pts`, { id: toastId });
        toast.success(res?.feedback);
        setCorrectOption(correct);
      } else {
        toast.error(res?.feedback);
      }

      setSubmitted(true);
    } catch (error) {
      toast.error("Submission failed", { id: toastId });
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setChoose("");
      setSubmitted(false);
      setCorrectOption(null);
    } else {
      console.log("working");
      onComplete(correctQuestions);
    }
  };

  return (
    <div className="p-4 rounded-md  max-w-xl mx-auto">
      <div className="flex justify-between items-center  w-full p-2 ">
        <h2 className="text-xl font-bold mb-4">
          Question {questionIndex + 1}{" "}
        </h2>
        <p className=" font-semibold text-slate-500 ">{`Points: ${questions[questionIndex]?.points}`}</p>
      </div>

      <p className="mb-4">{currentQuestion.questionText}</p>

      {currentQuestion.questionType === "MCQ" &&
        currentQuestion.options?.map((opt, i) => (
          <button
            key={i}
            className={`block w-full  text-left px-4 py-2 mb-2 rounded shadow shadow-cyan-500 ${
              choose === opt ? "bg-blue-500" : " hover:bg-blue-300"
            }`}
            onClick={() => setChoose(opt)}
            disabled={submitted}
          >
            {opt?.options}
          </button>
        ))}

      {(currentQuestion.questionType === "NUMERIC" ||
        currentQuestion.questionType === "WRITTEN") && (
        <input
          type={currentQuestion.questionType === "NUMERIC" ? "number" : "text"}
          placeholder="Your answer"
          className="w-full px-4 py-2  shadow shadow-cyan-500  rounded mb-4"
          value={choose}
          onChange={(e) => setChoose(e.target.value)}
          disabled={submitted}
        />
      )}

      {!submitted ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={match}
        >
          Submit
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default TaskBox;
