import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuizzes } from "../services/operations/quizApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Basic/Navbar";
import QuizFilter from "../components/QuizFilter";

const Quizzes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [myQuizMode, setMyQuizMode] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const all = await dispatch(getAllQuizzes({}, token)); // ✅ plain data
      if (all) {
        setQuizzes(all);
        setFilteredQuizzes(all);
      }
    };
    loadQuiz();
  }, []);

  const handleFilter = (filters) => {
    const filtered = quizzes.filter((quiz) => {
      return (
        (filters.topic === "" || quiz.topic === filters.topic) &&
        (filters.difficulty === "" || quiz.difficulty === filters.difficulty) &&
        (filters.questionType === "" ||
          quiz.questionType === filters.questionType)
      );
    });
    setFilteredQuizzes(filtered);
  };

  const myQuiz = () => {
    if (!myQuizMode) {
      const filtered = quizzes.filter(
        (quiz) => quiz?.generatedBy === user?._id
      );
      setFilteredQuizzes(filtered);
    } else {
      setFilteredQuizzes(quizzes);
    }
    setMyQuizMode(!myQuizMode);
  };

  return (
    <div className={"min-h-screen w-screen"}>
      <Navbar />

      <div className="pt-20 min-h-screen p-4 ">
        <h2 className="font-semibold text-2xl text-center mb-5 ">Quizzes</h2>
        <div className="w-full flex gap-4 flex-col md:flex-row lg:flex-row  justify-between items-center">
          <QuizFilter quizzes={quizzes} onFilter={handleFilter} />
          <div className="flex gap-3 items-center p-3 ">
            <button
              onClick={myQuiz}
              className="p-3 font-semibold bg-blue-600 text-white  rounded-lg px-6 hover:bg-blue-500"
            >
              {!myQuizMode ? " My Quizzes" : "All Quizzes"}
            </button>
            <button
              onClick={() => navigate("/quiz/generate")}
              className="p-3 font-semibold bg-green-600 text-white  rounded-lg px-6 hover:bg-green-500"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex mt-5  flex-col gap-4 p-3 ">
          {filteredQuizzes.map((quiz, i) => {
            let totalPoints = 0;
            quiz?.questions?.map(
              (question) => (totalPoints += question?.points)
            );
            const isDone = user.quizHistory.some(
              (entry) => entry?.quizId === quiz?._id
            );
            return (
              <div
                key={i}
                onClick={() =>
                  isDone
                    ? toast("You are already attempted this Quiz", {
                        icon: "⚠️",
                        style: {
                          border: "1px solid #facc15", // yellow-400
                          padding: "10px",
                          color: "#92400e", // amber-800
                          background: "#fef9c3", // amber-100
                        },
                      })
                    : navigate(`/quiz/${quiz?._id}`)
                }
                className="w-full flex items-center gap-3 p-4 rounded-lg shadow-cyan-500 shadow  "
              >
                <div className="relative">
                  <p>{i + 1}.</p>
                  <i
                    className={`absolute top-1  font-semibold text-2xl -left-1 ${
                      isDone ? "flex" : "hidden"
                    }  text-green-500  ri-check-double-line`}
                  ></i>
                </div>

                <div className="flex flex-col gap-2 p-1">
                  <div className="flex w-full items-center  justify-between">
                    <h3 className="font-semibold text-md capitalize p-1">
                      {quiz?.title}
                    </h3>
                    <p className="font-semibold text-green-500">
                      {totalPoints}pts
                    </p>
                  </div>

                  <div className="px-2 flex gap-2 text-slate-400">
                    <p className="capitalize ">{quiz?.topic}</p>
                    <p className="capitalize ">{quiz?.difficulty}</p>
                    <p className="capitalize text-center  ">
                      Q : {quiz?.numberOfQuestions}
                    </p>
                    <p className="capitalize ">{quiz?.questionType}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
