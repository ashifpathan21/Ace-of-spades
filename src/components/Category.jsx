import React  , {useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Category = (props) => {

  const categories = ['All'];

  const {courses} = useSelector((state)=> state.courses) ;
  
  courses.forEach((course) => {
    if (!categories.includes(course.category)) {
      categories.push(course.category);
    }
  });

 
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className='max-w-[600px] md:max-w-[900px] items-center lg:max-w-[1080px] p-2 text-[10px] md:text-sm lg:text-base flex gap-4 md:gap-5 lg:gap-6 mx-auto h-7'>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => props.setActiveCategory(category)}
            className={props.activeCategory === category ? ' border bg-gray-300 bg-opacity-10 border-slate-600 px-2 py-1  rounded-lg ' : ''}
          >
            {category}
          </div>
        ))}
      </div>

  
    </div>
  )
}

export default Category
