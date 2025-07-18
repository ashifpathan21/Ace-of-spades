import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const ThisCoursePie = (props) => {
  const valueFormatter = ({ id, value }) => `${id + "         "}${value}%`;

  return (
    <PieChart
      width={300}
      height={300}
      series={[
        {
          data: props.data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -45,
          endAngle: 225,
          cx: 150,
          cy: 150,
          valueFormatter: valueFormatter,
          highlightScope: { faded: "global", highlighted: "item" },
          fadedOpacity: 0.3,
        },
      ]}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
};

export default ThisCoursePie;
