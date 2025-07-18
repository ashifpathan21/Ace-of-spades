// SectionForm.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  createSection,
  deleteSection,
  updateSection,
  updateSubSection,
  createSubSection,
  deleteSubSection,
} from "../../services/operations/sectionApi.js";

import { getCourseDetailsInstructor } from "../../services/operations/coursesApi.js";

import { useSelector, useDispatch } from "react-redux";
import QuestionForm from "./QuestionForm";
import "../../index.css";
import RichTextEditor from "../RichTextEditor.jsx";

const SectionForm = ({ courseId: propCourseId, changeStage }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { courses } = useSelector((state) => state.instructorCourses);
  const index = courses.length - 1;
  const courseId = propCourseId || courses[index]?._id;

  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [sectionName, setSectionName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sections, setSections] = useState([]);
  const [subsectionId, setSubsectionId] = useState("");
  const [sectionId, setSectionId] = useState("");

  const [createSectionModal, setCreateSectionModal] = useState(false);
  const [subsectionModal, setSubsectionModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);

  const [mode, setMode] = useState("Create");

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      const courseDetails = await dispatch(
        getCourseDetailsInstructor({ courseId }, token)
      );
      setSections(courseDetails?.courseContent || []);
      setLoading(false);
    };
    fetchSections();
  }, [courseId, createSectionModal, subsectionModal, questionModal, waiting]);

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "Create") {
        await dispatch(createSection({ sectionName, courseId }, token));
      } else {
        await dispatch(
          updateSection({ sectionName, sectionId, courseId }, token)
        );
      }
      resetSectionForm();
    } catch {
      toast.error("Error in section operation");
    }
    setLoading(false);
  };

  const handleSubsectionSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      if (mode === "Create") {
        const res = await dispatch(
          createSubSection({ sectionId, title, description, videoUrl }, token)
        );
        const last = res?.subSection?.slice(-1)[0];
        setSubsectionId(last?._id);
      } else {
        await dispatch(
          updateSubSection(
            {
              sectionId,
              subSectionId: subsectionId,
              title,
              description,
              videoUrl,
            },
            token
          )
        );
      }
      setQuestionModal(true);
    } catch {
      toast.error("Subsection failed");
    }
    setWaiting(false);
  };

  const resetSectionForm = () => {
    setSectionName("");
    setMode("Create");
    setCreateSectionModal(false);
  };

  const openUpdateSection = (section) => {
    setSectionId(section._id);
    setSectionName(section.sectionName);
    setMode("Update");
    setCreateSectionModal(true);
  };

  const openCreateSubsection = (sectionId) => {
    setSectionId(sectionId);
    setTitle("");
    setVideoUrl("");
    setDescription("");
    setMode("Create");
    setSubsectionModal(true);
  };

  const openUpdateSubsection = (sub, sectionId) => {
    setSectionId(sectionId);
    setSubsectionId(sub._id);
    setTitle(sub.title);
    setVideoUrl(sub.videoUrl);
    setDescription(sub.description);
    setMode("Update");
    setSubsectionModal(true);
  };

  const handleDeleteSection = async (id) => {
    setWaiting(true);
    await dispatch(deleteSection({ sectionId: id, courseId }, token));
    setWaiting(false);
  };

  const handleDeleteSubsection = async (subId, secId) => {
    setWaiting(true);
    await dispatch(
      deleteSubSection({ sectionId: secId, subSectionId: subId }, token)
    );
    await dispatch(getCourseDetailsInstructor({ courseId }, token));
    setWaiting(false);
  };

  return (
    <div className="min-h-screen w-full p-2  ">
      {/* Section Modal */}
      {createSectionModal && (
        <Modal onClose={resetSectionForm}>
          <form
            onSubmit={handleSectionSubmit}
            className="space-y-4 max-w-md mx-auto"
          >
            <input
              type="text"
              required
              placeholder="Enter section name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Processing..." : mode}
            </button>
          </form>
        </Modal>
      )}

      {/* Subsection Modal */}
      {subsectionModal && !questionModal && (
        <Modal onClose={() => setSubsectionModal(false)}>
          <form
            onSubmit={handleSubsectionSubmit}
            className="space-y-4 overflow-y-scroll"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Subsection title"
              className="w-full border p-2 rounded bg-white text-black"
              required
            />
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video URL"
              className="w-full border p-2 rounded bg-white text-black"
              required
            />
            <RichTextEditor
              id="desc"
              value={description}
              onChange={setDescription}
              placeholder="Video description"
              className="max-h-48 border overflow-auto"
            />

            <div className="w-full flex justify-between px-4 ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {waiting ? "Saving..." : mode}
              </button>

              {mode === "Update" && (
                <button
                  onClick={() => setQuestionModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}

      {questionModal && (
        <QuestionForm
          courseId={courseId}
          sectionId={sectionId}
          subsectionId={subsectionId}
          setSubsectionModal={setSubsectionModal}
          setQuestionModal={setQuestionModal}
          changeStage={changeStage}
        />
      )}

      {/* Main UI */}
      {!createSectionModal && !subsectionModal && (
        <div className="min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chapters</h2>
            <button
              onClick={() => {
                setSectionName("");
                setMode("Create");
                setCreateSectionModal(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              + New Section
            </button>
          </div>

          {waiting ? (
            <p>Updating...</p>
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section._id}
                  className="p-3 rounded shadow-cyan-500 shadow"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{section.sectionName}</h3>
                    <div className="flex gap-2 text-lg">
                      <i
                        className="ri-pencil-fill cursor-pointer"
                        onClick={() => openUpdateSection(section)}
                      />
                      <i
                        className="ri-delete-bin-5-fill cursor-pointer"
                        onClick={() => handleDeleteSection(section._id)}
                      />
                      <i
                        className="ri-add-line cursor-pointer"
                        onClick={() => openCreateSubsection(section._id)}
                      />
                    </div>
                  </div>
                  <div className="ml-6 mt-2">
                    {section?.subSection?.map((sub) => (
                      <div
                        key={sub._id}
                        className="flex justify-between p-2 shadow-emerald-500 rounded shadow mt-1"
                      >
                        <p>{sub.title}</p>
                        <div className="flex gap-2">
                          <i
                            className="ri-pencil-fill cursor-pointer"
                            onClick={() =>
                              openUpdateSubsection(sub, section._id)
                            }
                          />
                          <i
                            className="ri-delete-bin-5-fill cursor-pointer"
                            onClick={() =>
                              handleDeleteSubsection(sub._id, section._id)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => changeStage(3)}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Modal = ({ children, onClose }) => (
  <div className=" bottom-0  w-screen absolute top-0 left-0 min-h-screen overflow-y-scroll  bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded p-6 mt-20 min-h-screen  w-full max-w-xl relative">
      <button onClick={onClose} className="absolute top-2 right-3 text-2xl">
        ×
      </button>
      {children}
    </div>
  </div>
);

export default SectionForm;
