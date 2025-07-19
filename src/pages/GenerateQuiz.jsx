import { useEffect, useState } from "react";
import { generateQuiz } from "../services/operations/quizApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Basic/Navbar";

const GenerateQuiz = () => {
  const difficulties = ["easy", "medium", "hard"];
  const type = ["MCQ", "NUMERIC", "WRITTEN", "MIXED"];
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [questionType, setQuestionType] = useState("MCQ");
  const [generating, setGenerating] = useState(false);
  const generate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const data = { topic, difficulty, numberOfQuestions, questionType };
      const response = await generateQuiz(data, token);
      if(response){
        navigate('/quiz')
      }
    
    } catch (error) {}
  };

  return (
    <div className="min-h-screen w-screen h-full ">
      <Navbar />

      <div className="pt-20 p-10 min-h-screen w-screen flex justify-center items-center ">
        <form
          onSubmit={generate}
          className="flex w-full flex-col justify-center items-center gap-4 p-5 shadow shadow-cyan-400 "
        >
          <h2 className="font-semibold text-2xl ">Generate Quiz</h2>
          <div className="flex w-full flex-col gap-2 p-2">
            <label htmlFor="topic">Topic : </label>
            <input
              className="shadow shadow-emerald-400 p-2 "
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              placeholder="Enter Topic"
              id="topic"
            />
          </div>
          <div className="flex w-full flex-col gap-2 p-2">
            <label htmlFor="difficulty">Difficulty : </label>
            <select
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="shadow capitalize shadow-emerald-400 p-2 "
            >
              {difficulties.map((difficulty, i) => (
                <option
                  className="capitalize bg-transparent shadow shadow-emerald-400 text-slate-600"
                  key={i}
                  value={difficulty}
                >
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col gap-2 p-2">
            <label htmlFor="numberOfQuestions">Questions : </label>
            <input
              className="shadow shadow-emerald-400 p-2 "
              type="number"
              value={numberOfQuestions}
              onChange={(e) => {
                const value = e.target.value;
                if (value > 10) {
                  setNumberOfQuestions(10);
                } else if (value < 5) {
                  setNumberOfQuestions(5);
                } else {
                  setNumberOfQuestions(value);
                }
              }}
              max={10}
              min={5}
              placeholder="Enter No. of Questions : (5 - 10) "
              id="numberOfQuestions"
            />
          </div>
          <div className="flex w-full flex-col gap-2 p-2">
            <label htmlFor="questionType">Type of Questions : </label>
            <select
              name="questionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="shadow capitalize shadow-emerald-400 p-2 "
            >
              {type.map((type, i) => (
                <option
                  className="capitalize bg-transparent shadow shadow-emerald-400 text-slate-600"
                  key={i}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button className='p-3 font-semibold px-6  shadow-md shadow-emerald-700 rounded-lg ' disabled={generating}>Generate</button>
        </form>
      </div>
    </div>
  );
};

export default GenerateQuiz;
