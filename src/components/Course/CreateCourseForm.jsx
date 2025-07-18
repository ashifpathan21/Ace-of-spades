import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import RichTextEditor from "../RichTextEditor.jsx";
import { useNavigate } from "react-router-dom";
import {
  createNewCourse,
  updateCourse,
} from "../../services/operations/coursesApi";
import SectionForm from "./SectionForm";

const CreateCourseForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const { categories } = useSelector((state) => state.courses);

  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState("");
  const [price, setPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [thumbnail, setThumbnail] = useState("");
  const [instructions, setInstructions] = useState("");
  const [courseId, setCourseId] = useState("");

  const token = localStorage.getItem("token");

  const changeStage = (num) => {
    props.setActiveStage(num);
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "aceofspades");
      data.append("cloud_name", "dslhfux94");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dslhfux94/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const uploadImageURL = await res.json();
        setThumbnail(uploadImageURL.url);
      } catch (error) {
        toast.error("Thumbnail upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const completeCourse = async () => {
    setWaiting(true);
    try {
      await dispatch(updateCourse({ courseId, updates: { status } }, token));
      toast.success("Course Published Successfully");
      navigate("/instructor/courses");
    } catch (error) {
      toast.error("Failed to publish course.");
    } finally {
      setWaiting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalPrice = price === "free" ? 0 : actualPrice;

    try {
      const course = await dispatch(
        createNewCourse(
          {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price: finalPrice,
            category,
            status: "Draft",
            thumbnail,
            instructions,
          },
          token
        )
      );
      setCourseId(course._id);
      props.setActiveStage(2);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] min-h-screen h-full relative mx-auto mt-8 p-4">
      {props.activeStage === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Course Name"
            value={courseName}
            onChange={setCourseName}
            id="courseName"
          />

          <RichEditor
            label="Course Description"
            value={courseDescription}
            onChange={setCourseDescription}
            id="courseDescription"
          />

          <RichEditor
            label="What You Will Learn"
            value={whatYouWillLearn}
            onChange={setWhatYouWillLearn}
            id="whatYouWillLearn"
          />

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-bold mb-2 text-gray-700"
            >
              Price:
            </label>
            <select
              id="price"
              required
              className="shadow appearance-none border rounded w-full bg-white py-2 px-3 text-gray-700 focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Select price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {price === "paid" && (
              <div className="flex items-center mt-2 relative">
                <span className="absolute left-2">₹</span>
                <input
                  type="number"
                  required
                  className="shadow appearance-none border rounded w-full bg-white py-2 pl-6 pr-3 text-gray-700 focus:outline-none"
                  placeholder="Enter price"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-bold mb-2 text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              required
              className="shadow appearance-none border rounded w-full bg-white py-2 px-3 text-gray-700 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-bold mb-2 text-gray-700"
            >
              Thumbnail:
            </label>
            <input
              type="file"
              required
              id="thumbnail"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 focus:outline-none"
              onChange={onFileChange}
              ref={inputFile}
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="mt-2 h-20 w-20 object-cover"
              />
            )}
          </div>

          <RichEditor
            label="Instructions"
            value={instructions}
            onChange={setInstructions}
            id="instructions"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Uploading..." : "Create Course"}
          </button>
        </form>
      )}

      {props.activeStage === 2 && (
        <SectionForm changeStage={changeStage} courseId={courseId} />
      )}

      {props.activeStage === 3 && (
        <div className="bg-white rounded-lg text-black p-3">
          <h2 className="text-center text-xl font-semibold">
            Publish Your Course
          </h2>
          <div className="w-[90%] mt-10 mx-auto mb-10 shadow-xl rounded-lg">
            <p className="p-2">Set Status</p>
            <form className="w-full border rounded-lg">
              <select
                required
                className="w-full p-3 px-4"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </form>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={completeCourse}
              className="p-3 px-5 bg-green-500 text-white font-semibold rounded-lg"
              disabled={waiting}
            >
              {waiting ? "Publishing..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold mb-2 text-gray-700">
      {label}:
    </label>
    <input
      type="text"
      id={id}
      required
      className="shadow appearance-none border rounded w-full bg-white py-2 px-3 text-gray-700 focus:outline-none"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const RichEditor = ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold mb-2 text-gray-700">
      {label}:
    </label>
    <RichTextEditor
      id={id}
      required
      className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-gray-700 focus:outline-none"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default CreateCourseForm;
