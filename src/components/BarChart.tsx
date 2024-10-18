import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export interface DataProps {
  data: Record<string, unknown>[];
  inputFields: { column: string }[];
}
interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

interface ChartData {
  type: string;
  data: {
    datasets: DataSet[];
    labels?: string[];
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC<DataProps> = ({ data, inputFields }) => {
  const [chartData, setChartData] = useState<ChartData>({
    type: "bar",
    data: { labels: [], datasets: [] },
  });
  useEffect(() => {
    const val = data;
    if (val === undefined) return;
    const labels = Object.values(val).map(
      (cur: object) => (cur as { dateField: string }).dateField
    );
    const columnsToAggregate = inputFields.flatMap((input) =>
      Object.values(input)
    );
    const colours = [
      "rgba(75,192,192,0.4)",
      "rgb(173,255,47)",
      "rgb(255, 99, 132)",
      "rgb(50,205,50)",
      "rgba(75,192,192,1)",
    ];
    const rawData = Object.values(val);
    const newDataSet = columnsToAggregate.map((column, index) => {
      const data = rawData.map((data) => Number(data[column]));
      const indexMod = index % colours.length;
      return {
        label: column,
        data: data,
        backgroundColor: colours[indexMod], // Color of the points
        borderColor: colours[indexMod + 1], // Color of the line connecting the points
      };
    });
    setChartData({
      type: "bar",
      data: { labels: labels, datasets: newDataSet },
    });
  }, [data, inputFields]);
  return (
    <div>
      <Bar data={chartData.data} />
    </div>
  );
};

export default BarChart;
