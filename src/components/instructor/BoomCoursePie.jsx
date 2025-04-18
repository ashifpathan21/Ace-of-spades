import React  , {useEffect}from 'react';
import { PieChart } from '@mui/x-charts/PieChart';




export default function BoomCoursePie(props) {
  const {topCourses , setTotalStudents} = props
    const desktopOS = [
        { id: 'course1', value: 50 },
        { id: 'course2', value: 20 },
        { id: 'course3', value: 10 }
    ];

    let total = 0  ;
    const data = topCourses.map((course , index) =>{
      total += course.studentsEnrolled.length ;
      return {id: course.courseName , value: course.studentsEnrolled.length > 0 ? course.studentsEnrolled.length : 10}
    })
   
    total = total > 0 ? total : 20 
   
    useEffect(()=>{
      setTotalStudents(total)
    } , [])
    const valueFormatter = ({ id, value }) => `${id + '         '}${value/(total) *100}%`;
  return (
    <PieChart 
      series={[
        {
          data: data,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={200}
    />
  );
}