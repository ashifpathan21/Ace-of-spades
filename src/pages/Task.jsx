import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Basic/Navbar.jsx";
import Footer from "../components/Basic/Footer.jsx";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { completeLecture } from "../services/operations/sectionApi.js";
import "../index.css";
import TaskBox from "../components/TaskBox.jsx";
const Task = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { courses } = useSelector((state) => state.courses);
  const [sectionName, setSectionName] = useState("");
  const [subSection, setSubSection] = useState({});
  const [questionModal, setQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [disable, setDisable] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [compl, setCompl] = useState(true);
  const token = localStorage.getItem("token");

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const convertSecondsToMinutes = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const next = async (correctQuestions) => {
    try {
      setDisable(true);
      const response = await dispatch(
        completeLecture(
          { courseId: id, subsectionId: subSection._id, correctQuestions },
          token
        )
      );
      if (response) {
        toast.success("Task Completed");
        navigate(`/courses/${id}`);
      }
      setQuestionModal(false);
    } catch (error) {
      toast.error(error.message);
    }
    setDisable(false);
  };

  const changeSubsection = (subsect) => {
    const compSubsec =
      user.courseProgress.find((coursePro) => coursePro.courseID === id)
        ?.completedVideos || [];
    const isCompleted = compSubsec.some(
      (section) => section.subSection._id === subsect._id
    );
    setCompl(isCompleted);
    setSubSection(subsect);
    setQuestions(subsect?.questions || []);
    setQuestionIndex(0);
    setSubmitted(false);
    setChoose("");
    setCorrectOption([]);
  };

  function convertYouTubeURL(url) {
    let videoID,
      startTime = "",
      endTime = "";
    let regex =
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/|live\/))([^?&]+)/;
    let match = url?.match(regex);
    if (match) {
      videoID = match[1];
      let urlParams = new URLSearchParams(url.split("?")[1]);
      if (urlParams.has("t")) {
        startTime = `?start=${urlParams.get("t").replace("s", "")}`;
      }
      if (urlParams.has("end")) {
        endTime = `${startTime ? "&" : "?"}end=${urlParams.get("end")}`;
      }
      return `https://www.youtube.com/embed/${videoID}${startTime}${endTime}`;
    }
    return url;
  }

  const videoUrl = convertYouTubeURL(subSection?.videoUrl);

  useEffect(() => {
    setLoading(true);

    const course = courses.find((course) => course._id === id);
    setSelectedCourse(course);

    const compSubsec =
      user.courseProgress.find((coursePro) => coursePro.courseID === id)
        ?.completedVideos || [];
    let complete = compSubsec.length;
    let section, subSect;

    for (let i = 0; i < course?.courseContent?.length; i++) {
      if (course.courseContent[i].subSection.length > complete) {
        section = course.courseContent[i];
        subSect = section.subSection[complete];
        break;
      } else {
        complete -= course.courseContent[i]?.subSection?.length;
      }
    }

    const defaultSectionName = course?.courseContent[0]?.sectionName;
    const defaultSubSection = course?.courseContent[0]?.subSection[0];

    if (subSect) setCompl(false);
    setSectionName(section?.sectionName || defaultSectionName);
    setSubSection(subSect || defaultSubSection);
    const attemptedQuestionIds = user?.questionHistory?.map((q) => q.question);

    // Filter only unattempted questions
    const unattemptedQuestions = subSect?.questions?.filter(
      (q) => !attemptedQuestionIds?.includes(q?._id)
    );
    setQuestions(unattemptedQuestions || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCourse?.courseContent) {
      const initialState = {};
      selectedCourse.courseContent.forEach((_, index) => {
        initialState[index] = true;
      });
      setOpenSections(initialState);
    }
  }, [selectedCourse]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="loader text-black font-bold"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {questionModal ? (
        <div className="pt-20 p-3">
          <TaskBox
            questions={questions}
            onComplete={next} // Callback to move to next or finish
          />
        </div>
      ) : (
        <div className="pt-20 flex flex-col md:flex-row gap-10 p-4 w-full justify-between min-h-screen">
          {/* Video Area */}
          <div className="w-full flex flex-col min-h-screen">
            <div className="p-4 px-2 flex flex-col gap-5">
              <h3 className="font-semibold text-slate-400 text-lg capitalize">
                {`${selectedCourse?.courseName?.slice(
                  0,
                  10
                )}... > ${sectionName} > ${subSection?.title?.slice(0, 10)}...`}
              </h3>
              {videoUrl && (
                <div className="w-full flex justify-center items-center mt-5">
                  <iframe
                    className="w-full aspect-video rounded-lg shadow-lg"
                    src={videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="w-full p-3">
                <p className="text-center capitalize font-bold text-lg pb-3">
                  {subSection?.title}
                </p>
                <div className="max-w-[850px] mx-auto mt-3">
                  <div
                    style={{
                      height: `${Math.min(
                        450,
                        Math.max(200, subSection?.description?.length)
                      )}px`,
                    }}
                    className="prose dark:prose-invert p-4 overflow-y-auto rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: subSection?.description,
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                {!compl && (
                  <button
                    onClick={() =>
                      questions?.length > 0 ? setQuestionModal(true) : next()
                    }
                    className="mt-10 bg-blue-500 text-white font-semibold rounded-xl p-3 block px-8"
                  >
                    {questions?.length > 0 ? "Practice Questions" : "Complete"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="p-4 px-6 flex gap-4 flex-col shadow-md rounded-lg md:w-[45%] py-10 self-start">
            <div className="text-xl font-semibold">
              {selectedCourse?.courseName}
            </div>
            <div className="w-full flex flex-col gap-3">
              {selectedCourse?.courseContent?.map((section, index) => (
                <div key={index} className="relative shadow-md rounded-lg p-4">
                  <h2 className="uppercase font-semibold">
                    {section?.sectionName}
                  </h2>
                  <button
                    onClick={() => toggleSection(index)}
                    className={`absolute right-0 top-0 p-4 text-2xl font-bold transition-all ${
                      openSections[index] ? "rotate-180" : "rotate-0"
                    } duration-300`}
                  >
                    <i className="ri-arrow-down-double-line"></i>
                  </button>
                  <p className="text-sm text-slate-600">
                    {section?.subSection?.length > 0
                      ? `${section?.subSection?.length} Lesson`
                      : ""}
                  </p>
                  {openSections[index] &&
                    (section?.subSection?.length > 0 ? (
                      <div
                        onClick={() => setSectionName(section?.sectionName)}
                        className="shadow-xl mt-2 rounded-lg flex flex-col gap-2"
                      >
                        {section?.subSection?.map((subsect, idx) => (
                          <div
                            key={idx}
                            onClick={() => changeSubsection(subsect)}
                            className={`capitalize flex p-2 rounded-lg shadow ${
                              subSection._id === subsect._id
                                ? "bg-cyan-400"
                                : "hover:bg-cyan-300"
                            } transition-all duration-200`}
                          >
                            <button className="p-2">
                              <i className="font-bold text-xl ri-play-mini-line"></i>
                            </button>
                            <div className="w-full text-md">
                              <h3>{subsect?.title}</h3>
                              <p className="px-1 text-slate-500 text-sm">
                                {convertSecondsToMinutes(subsect?.timeDuration)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Coming Soon ..</p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!questionModal && <Footer />}
    </div>
  );
};

export default Task;
