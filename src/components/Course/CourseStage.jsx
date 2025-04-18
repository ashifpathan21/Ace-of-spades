import React from 'react';

//the upper part of the course creation or updation
const CourseStage = ({ stage, activeStage, completed }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-500';

  if (activeStage === stage) {
    bgColor = 'bg-blue-500';
    textColor = 'text-white';
  } else if (completed) {
    bgColor = 'bg-green-500';
    textColor = 'text-white';
  }

  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${bgColor} ${textColor}`}>
      {stage}
    </div>
  );
};

export default CourseStage;
