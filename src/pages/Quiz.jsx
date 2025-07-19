import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti-boom";
import { submitQuiz } from "../services/operations/quizApi";
import QuestionRenderer from "../components/QuestionRenderer.jsx";
import Navbar from "../components/Basic/Navbar.jsx";
const Quiz = () => {
  const dummyResult = {
    score: 7,
    answers: [
      {
        feedback: "Correct!",
        isCorrect: true,
        question: "687a1b7319c6877fbe649910",
        score: 2,
      },
    ],
  };
  const navigate = useNavigate();
  const params = useParams();
  const { quizzes } = useSelector((state) => state.quizzes);
  const { user, token } = useSelector((state) => state.user);
  const { id } = params;

  const quiz = quizzes?.find((quiz) => quiz._id === id);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting , setSubmitting ] = useState(false) 
  const [result, setResult] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const timerRef = useRef(null);

  const selectedQuiz = quiz;

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
      setSubmitting(true) 
     const toastId =  toast.loading('Submitting !!')
    const answers = Object.entries(userAnswers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    const response = await submitQuiz(
      { quizId: selectedQuiz?._id, answers },
      token
    )();
     toast.dismiss(toastId); 
    
    if (response) {
      setResult(response);
      setSubmitted(true);
      clearInterval(timerRef.current);
    }
   
    setSubmitting(false) 
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuiz?.questions?.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(120);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setTimeLeft(120);
    }
  };

  useEffect(() => {
    const done = user?.quizHistory?.some(
      (entry) => entry?.quizId === selectedQuiz?._id
    );
    setIsDone(done);

    let total = 0;
    selectedQuiz?.questions?.forEach((q) => (total += q?.points || 0));
    setPoints(total);
  }, [selectedQuiz]);

  useEffect(() => {
    if (!started || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentQuestion < selectedQuiz.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            return 120;
          } else {
            handleSubmit();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, currentQuestion]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const currentQ = selectedQuiz?.questions?.[currentQuestion];

  if (submitted) {
    return (
      <div className="min-h-screen h-full  w-screen ">
        <Navbar />

        <div className="pt-20 flex flex-col  ">
          <h2 className="font-semibold text-2xl text-center">Results</h2>

          <div className="w-full mt-5  flex justify-center items-center ">
            <div
              className={`flex flex-col relative items-center justify-end w-[100px] scale-130" : "scale-95"
              `}
            >
              <Confetti
                className="absolute z-10 "
                mode="fall"
                particleCount={100}
                effectInterval={5000}
                colors={["#ff577f", "#ff884b"]}
              />

              <Confetti
                className="absolute z-10 "
                mode="boom"
                particleCount={100}
                effectInterval={5000}
                colors={["#ff577f", "#ff884b"]}
              />

              <div className="relative">
                <img
                  src={user?.image}
                  alt={user?.userName}
                  className={`rounded-full border-4 
                    border-yellow-400 
                   w-20 h-20 object-cover`}
                />

                <div className="absolute bottom-0 right-0 bg-yellow-100 text-black font-bold text-xs px-2 py-0.5 rounded-full">
                  🏆
                </div>
              </div>

              <div className="mt-2 font-semibold text-sm">
                {user?.firstName + " " + user?.lastName}
              </div>
            </div>
          </div>

          <h2 className="text-xl mt-2 font-semibold text-center ">{`Congrats ! You gained ${result?.score} out of ${points}`}</h2>

          <div className="flex mt-4  flex-col gap-3 p-3 ">
            {result?.answers?.map((ans, i) => (
              <div
                key={i}
                className="flex shadow-md shadow-cyan-400 items-center justify-between  gap-3 p-2 "
              >
               
                <div className="flex flex-col gap-2 ">
                  <h3>Q {i+1} : {ans?.question?.questionText}</h3>
                  {ans?.question?.questionType === "MCQ" ? (
                    <ul className='text-slate-500'>
                      {ans?.question?.options?.map((opt , i) => (
                        <li
                        key={i}
                          className={`${
                            opt._id === ans?.question?.correctOption?._id ?
                            "text-green-400" : "text-slate-500"
                          }`}
                        >
                          {i+1 + " " +  opt?.options}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-slate-500'>Ans : {ans?.question?.correctAnswer}</p>
                  )}
                </div>
                <div className="flex flex-col p-3  gap-2 ">
                  {ans?.isCorrect ? (
                    <i className="text-2xl font-semibold text-green-500 ri-check-double-line"></i>
                  ) : (
                    <i className="text-2xl font-semibold text-red-500 ri-close-large-line"></i>
                  )}
                  <p>{ans?.feedback}</p>
                  <p>{ans?.score + "/" + ans?.question?.points}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => navigate("/quiz")}
              className="underline font-semibold cursor-pointer p-2 "
            >
              Explore More Quizzes{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen h-full w-screen">
      {!started ? (
        <div className="relative p-6 h-full  flex flex-col gap-5 w-screen">
          <button
            className="absolute shadow shadow-emerald-500 p-2 z-10 top-15 left-3"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <h2 className="font-semibold text-2xl text-center">Quiz Details</h2>
          <div className="mt-10 p-5 flex flex-col gap-4 font-semibold capitalize shadow-md shadow-cyan-600">
            <h4>Title : {selectedQuiz?.title}</h4>
            <p>Topic : {selectedQuiz?.topic}</p>
            <p>difficulty : {selectedQuiz?.difficulty}</p>
            <p>Questions : {selectedQuiz?.numberOfQuestions}</p>
            <p>Type : {selectedQuiz?.questionType}</p>
            <p className="text-green-600">Points Earn : {points}pts</p>
            <p className="text-yellow-600 font-medium flex items-center gap-2">
              ⚠️{" "}
              <span>
                Once the quiz starts, you <strong>cannot go back</strong>.
                Leaving or refreshing the page will result in{" "}
                <strong>automatic disqualification</strong>.
              </span>
            </p>
          </div>
          <button
            onClick={() =>
              isDone
                ? toast("You already attempted this Quiz", {
                    icon: "⚠️",
                    style: {
                      border: "1px solid #facc15",
                      padding: "10px",
                      color: "#92400e",
                      background: "#fef9c3",
                    },
                  })
                : setStarted(true)
            }
            className="p-3 font-semibold bg-green-500 rounded-lg mt-20"
          >
            {isDone ? "Done" : "Start"}
          </button>
        </div>
      ) : (
        <div className="p-5 flex flex-col gap-6">
          <div className="text-center font-bold text-xl">
            Time Left:{" "}
            <span className="text-red-600">{formatTime(timeLeft)}</span>
          </div>
          <div className="shadow-md p-4">
            <p className="text-md font-semibold">
              Q{currentQuestion + 1}.{" "}
              {<QuestionRenderer questionText={currentQ?.questionText} />}
            </p>
            {currentQ?.questionType === "MCQ" &&
              currentQ?.options?.map((opt) => (
                <label key={opt._id} className="block my-2">
                  <input
                    type="radio"
                    name={`question-${currentQ._id}`}
                    value={opt._id}
                    checked={userAnswers[currentQ._id] === opt._id}
                    onChange={() => handleAnswerChange(currentQ._id, opt._id)}
                    className="mr-2"
                  />
                  {opt.options}
                </label>
              ))}
            {currentQ?.questionType === "NUMERIC" && (
              <input
                type="number"
                className="border p-2 mt-3"
                placeholder="Enter number"
                value={userAnswers[currentQ._id] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQ._id, e.target.value)
                }
              />
            )}
            {currentQ?.questionType === "WRITTEN" && (
              <textarea
                className="border p-2 mt-3 w-full"
                placeholder="Type your answer"
                value={userAnswers[currentQ._id] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQ._id, e.target.value)
                }
              />
            )}
            <div className="mt-4 flex gap-4">
              <button
                className="bg-purple-500 text-white px-3 py-1 rounded"
                onClick={() => handleMarkForReview(currentQ._id)}
              >
                {markedForReview[currentQ._id] ? "Unmark" : "Mark for Review"}
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleNext}
                disabled={currentQuestion === selectedQuiz.questions.length - 1}
              >
                Next
              </button>
              <button
              disabled={submitting || submitted}
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
