import React, { useState, useEffect } from "react";

const QuizFilter = ({ quizzes, onFilter }) => {
  const [filters, setFilters] = useState({
    topic: "",
    difficulty: "",
    questionType: "",
  });

  const [uniqueTopics, setUniqueTopics] = useState([]);
  const [uniqueDifficulties, setUniqueDifficulties] = useState([]);
  const [uniqueQuestionTypes, setUniqueQuestionTypes] = useState([]);

  useEffect(() => {
    // Extract unique values
    const topics = [...new Set(quizzes.map((q) => q.topic))];
    const difficulties = [...new Set(quizzes.map((q) => q.difficulty))];
    const types = [...new Set(quizzes.map((q) => q.questionType))];

    setUniqueTopics(topics);
    setUniqueDifficulties(difficulties);
    setUniqueQuestionTypes(types);
  }, [quizzes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    onFilter(updatedFilters); // You can call parent to filter quizzes
  };

  return (
    <div className="flex gap-3 p-2">
      {/* Topic */}
      <select
        name="topic"
        value={filters.topic}
        onChange={handleChange}
        className="p-2 text-slate-400  border rounded-md"
      >
        <option value="">All Topics</option>
        {uniqueTopics.map((topic, i) => (
          <option key={i} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {/* Difficulty */}
      <select
        name="difficulty"
        value={filters.difficulty}
        onChange={handleChange}
        className="p-2 border text-slate-400 rounded-md"
      >
        <option value="">All Levels</option>
        {uniqueDifficulties.map((level, i) => (
          <option key={i} value={level}>
            {level}
          </option>
        ))}
      </select>

      {/* Question Type */}
      <select
        name="questionType"
        value={filters.questionType}
        onChange={handleChange}
        className="p-2 text-slate-400 border rounded-md"
      >
        <option value="">All Types</option>
        {uniqueQuestionTypes.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuizFilter;
