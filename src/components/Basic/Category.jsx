import React from "react";
import { useSelector } from "react-redux";

const Category = (props) => {
  const { categories } = useSelector((state) => state.courses);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="max-w-[600px] md:max-w-[900px] items-center lg:max-w-[1080px] p-2 text-[10px] md:text-sm lg:text-base flex gap-4 md:gap-5 lg:gap-6 mx-auto h-10">
        <div
          key="All"
          onClick={() => props.setActiveCategory("All")}
          className={
            props.activeCategory === "All"
              ? " border bg-gray-300 bg-opacity-10 border-slate-600 px-2 py-1  rounded-lg "
              : ""
          }
        >
          All
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => props.setActiveCategory(category._id)}
            className={
              props.activeCategory === category._id
                ? " border bg-gray-300 bg-opacity-10 border-slate-600 px-2 py-1  rounded-lg "
                : ""
            }
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
