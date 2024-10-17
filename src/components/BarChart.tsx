import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartProps {
  data: ChartData<"bar">;
}

const BarChart: React.FC<ChartProps> = ({ data}) => {
  return (
    <div> 
      
      <Bar data={data}/>
    </div>
  );
};

export default BarChart;
