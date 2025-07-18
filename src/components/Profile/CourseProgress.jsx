import React, { useState, useEffect } from "react";

const CourseProgress = (props) => {
  const [progress, setProgress] = useState(90);
  const { course, user } = props;

  const [totalSubsections, setTotalSubsections] = useState("");
  const [completedSubSections, setCompletedSubSections] = useState("");
  let compSubsec = 0;
  let subsections = 0;
  useEffect(() => {
    // //(course)
    course.courseContent.map(
      (section) => (subsections += section.subSection.length)
    );
    const progress = user?.courseProgress.filter(
      (cours) => cours.courseID === course._id
    )[0];
    // //(progress)
    // //(progress?.completedVideos)
    setCompletedSubSections(progress?.completedVideos?.length || "0");
    setTotalSubsections(subsections);
  }, []);

  return (
    <div
      className="flex flex-col h-full gap-2 justify-between p-4 px-10 shadow-lg rounded-lg border border-gray-200 
    transition-all duration-300 hover:shadow-xl hover:border-gray-300"
    >
      {/* course name */}
      <h2 className="w-full p-2 text-left text-md font-medium">
        {course?.courseName}
      </h2>

      <input
        type="range"
        max={totalSubsections}
        value={completedSubSections}
        readOnly
        className="appearance-none rounded-lg bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px]"
        style={{
          background: `linear-gradient(90deg, orange ${
            (completedSubSections / totalSubsections) * 100
          }%, white 1%)`,
        }}
      />

      <p className="text-gray-500 text-sm">
        {completedSubSections + "/" + totalSubsections}
      </p>
    </div>
  );
};

export default CourseProgress;
