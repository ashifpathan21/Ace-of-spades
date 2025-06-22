import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  createSectionn,
  deleteSectionn,
  updateSection,
  updateSubSection,
  getCourseDetailsInstructor,
  createSubSection,
  deleteSubSectionn,
} from '../../services/operations/coursesApi';
import { useSelector, useDispatch } from 'react-redux';
import QuestionForm from './QuestionForm';
import '../../index.css';
import RichTextEditor from '../RichTextEditor.jsx';

const SectionForm = ({ courseId: propCourseId, changeStage }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { courses } = useSelector((state) => state.instructorCourses);
  const { course } = useSelector((state) => state.createCourse);

  const index = courses.length - 1;
  const courseId = propCourseId || courses[index]?._id;

  const [isLoading, setIsLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState('Create');
  const [moding, setModing] = useState('Creating...');

  const [createSectionModal, setCreateSectionModal] = useState(false);
  const [subsectionModal, setSubsectionModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);

  const [sectionName, setSectionName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [sections, setSections] = useState([]);
  const [subsectionId, setSubsectionId] = useState('');
  const [sectionId, setSectionId] = useState('');

  useEffect(() => {
    async function fetchSections() {
      setLoading(true);
      const courseDetails = await dispatch(getCourseDetailsInstructor({ courseId }, token));
      setSections(courseDetails?.courseContent || []);
      setLoading(false);
    }
    fetchSections();
  }, [courseId, createSectionModal, subsectionModal, questionModal, waiting]);

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'Create') {
        await dispatch(createSectionn({ sectionName, courseId }, token));
      } else {
        await dispatch(updateSection({ sectionName, sectionId, courseId, token }));
      }
      resetSectionForm();
    } catch (err) {
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  const handleSubsectionSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      if (mode === 'Create') {
        const res = await dispatch(
          createSubSection({ sectionId, title, description, videoUrl }, token)
        );
        const subS = res?.subSection || [];
        setSubsectionId(subS[subS.length - 1]?._id);
        setQuestionModal(true);
      } else {
        await dispatch(
          updateSubSection({ sectionId, subSectionId: subsectionId, title, description, videoUrl }, token)
        );
        setQuestionModal(true);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
    setWaiting(false);
  };

  const deleteSection = async (id) => {
    setWaiting(true);
    try {
      await dispatch(deleteSectionn({ sectionId: id, courseId }, token));
    } catch (err) {
      toast.error('Something went wrong');
    }
    setWaiting(false);
  };

  const deleteSubSection = async (id, secId) => {
    setWaiting(true);
    try {
      await dispatch(deleteSubSectionn({ sectionId: secId, subSectionId: id }, token));
      await dispatch(getCourseDetailsInstructor({ courseId }, token));
    } catch (err) {
      toast.error('Something went wrong');
    }
    setWaiting(false);
  };

  const resetSectionForm = () => {
    setSectionName('');
    setMode('Create');
    setModing('Creating...');
    setCreateSectionModal(false);
  };

  const openUpdateSection = (section) => {
    setSectionId(section._id);
    setSectionName(section.sectionName);
    setMode('Update');
    setModing('Updating...');
    setCreateSectionModal(true);
  };

  const openCreateSubsection = (sectionId) => {
    setSectionId(sectionId);
    setTitle('');
    setVideoUrl('');
    setDescription('');
    setMode('Create');
    setModing('Creating...');
    setSubsectionModal(true);
  };

  const openUpdateSubsection = (subSect, sectionId) => {
    setSectionId(sectionId);
    setSubsectionId(subSect._id);
    setTitle(subSect.title);
    setVideoUrl(subSect.videoUrl);
    setDescription(subSect.description);
    setMode('Update');
    setModing('Updating...');
    setSubsectionModal(true);
  };

  if (isLoading) return <div><span className="loader"></span></div>;

  return (
    <>
      {createSectionModal && (
        <Modal onClose={resetSectionForm}>
          <form onSubmit={handleSectionSubmit} className="space-y-4 max-w-[600px] mx-auto">
            <label htmlFor="sectionName">Section Name</label>
            <input
              id="sectionName"
              type="text"
              required
              className="w-full p-2 bg-white text-black rounded-lg"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="Enter section name"
            />
            <button
              type="submit"
              className="bg-green-400 text-white font-semibold rounded-lg px-5 py-2"
            >
              {loading ? moding : mode}
            </button>
          </form>
        </Modal>
      )}

      {subsectionModal && (
        questionModal ? (
          <QuestionForm
            courseId={courseId}
            sectionId={sectionId}
            changeStage={changeStage}
            setSubsectionModal={setSubsectionModal}
            setQuestionModal={setQuestionModal}
            subsectionId={subsectionId}
          />
        ) : (
         <div className="fixed inset-0 z-50 flex items-center text-black  justify-center bg-opacity-40 backdrop-blur-3xl ">
  <div className="  rounded-lg w-[90%] max-w-4xl max-h-[95vh] overflow-y-auto relative p-8">

     <button onClick={() => {   
       setSubsectionModal(false )
     }} className="absolute top-5 right-10 ">
     <i className="font-semibold text-2xl  ri-close-large-line"></i>
                     </button>

             <h2 className='w-full mb-10 text-center font-semibold text-xl'>{mode} SubSection</h2>

            <form onSubmit={handleSubsectionSubmit} className="space-y-4 h-full min-h-screen">
              <input
                type="text"
                placeholder="Enter title"
                className="w-full p-2 rounded-lg bg-white text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Paste video URL"
                className="w-full p-2 rounded-lg bg-white text-black"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
              <RichTextEditor
              className='overflow-y-scroll max-h-[300px] '
                id="summary"
                value={description}
                onChange={(value) => setDescription(value)}
                placeholder="Enter summary of the video"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={waiting}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  {waiting ? moding : mode}
                </button>
                {mode === 'Update' && (
                  <button
                    type="button"
                    onClick={() => setQuestionModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
          </div>
        )
      )}

      {!createSectionModal && !subsectionModal && (
        <div className="min-h-screen">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Create Chapters</h2>
            <button
              onClick={() => {
                setSectionName('');
                setMode('Create');
                setModing('Creating...');
                setCreateSectionModal(true);
              }}
              className="bg-green-400 text-white font-semibold rounded-lg px-3 py-2"
            >
              New Section
            </button>
          </div>

          {waiting ? (
            <p>Updating...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sections?.map((section) => (
                <div key={section._id}>
                  <div className="flex justify-between items-center p-3 shadow-cyan-400 rounded-lg shadow">
                    <h3 className="text-xl font-bold">{section.sectionName}</h3>
                    <div className="flex gap-3">
                      <i className="ri-pencil-fill text-xl cursor-pointer" onClick={() => openUpdateSection(section)} />
                      <i className="ri-delete-bin-5-fill text-xl cursor-pointer" onClick={() => deleteSection(section._id)} />
                      <i className="ri-add-line text-xl cursor-pointer" onClick={() => openCreateSubsection(section._id)} />
                    </div>
                  </div>
                  <div className="ml-5 mt-2 space-y-2">
                    {section?.subSection?.map((sub) => (
                      <div key={sub._id} className="flex justify-between items-center px-4 shadow py-2 shadow-emerald-400 rounded">
                        <p>{sub.title}</p>
                        <div className="flex gap-3">
                          <i className="ri-pencil-fill text-xl cursor-pointer" onClick={() => openUpdateSubsection(sub, section._id)} />
                          <i className="ri-delete-bin-5-fill text-xl cursor-pointer" onClick={() => deleteSubSection(sub._id, section._id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections?.length > 0 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => changeStage(3)}
                className="bg-green-500 text-white px-5 py-3 rounded-lg font-semibold"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl bg-opacity-40 z-50">
    <div className=" shadow-cyan-400 p-6 rounded-lg shadow-lg relative w-[90%] max-w-xl">
      <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
        ×
      </button>
      {children}
    </div>
  </div>
);

export default SectionForm;
