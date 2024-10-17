import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Input from "./Input";
import DynamicInput from "./DynamicInput";
//import BarChart from "./BarChart";
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
 } from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataSet{
  label:string;
  data:number[];
  backgroundColor:string;
  borderColor:string;
}
interface ChartData{
  type:string;
  data:{
    datasets: DataSet[]
    labels?:string [];
  }
}
const MyForm: React.FC = () => {
  const [field, setField] = useState("");
  const [inputFields, setInputFields] = React.useState<{ column: string }[]>([
    { column: "" },
  ]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState({ data: [] }); //data from API
  const [interval, setInterval] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData>({type:'bar', data:{labels:[], datasets:[]}});

  useEffect(() => {
    const val = data?.data;
    if (val === undefined) return;
    const labels = Object.values(val).map((cur:{dateField:string}) => cur?.dateField);
    const columnsToAggregate = inputFields.flatMap((input) =>
      Object.values(input)
    );
    const colours = ['rgba(75,192,192,0.4)',"rgb(173,255,47)","rgb(255, 99, 132)", "rgb(50,205,50)", 'rgba(75,192,192,1)']
    const rawData = Object.values(val);
    const newDataSet = columnsToAggregate.map((column, index) =>{
      const data = rawData.map((data) => data[column]);
      const indexMod =  index % colours.length;
      return {
        label: column,
        data: data,
        backgroundColor: colours[indexMod],  // Color of the points
       borderColor: colours[indexMod + 1] ,  // Color of the line connecting the points
      };
    }
    );
    setChartData({type:'bar', data:{labels: labels, datasets:newDataSet}});
  }, [data?.data, inputFields]);

  const handleAddField = () => {
    const newField = { column: "" };
    setInputFields([...inputFields, newField]);
  };

  const handleRemoveField = (index: number) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = [...inputFields];
    data[index] = { column: e.target.value };
    setInputFields(data);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData({data:[]}); //reset data object to empty object before fetching
    if (typeof file === "undefined") return; //check that file is not undefined. This is a typescript requirement
    const columnsToAggregate = inputFields.flatMap((input) =>
      Object.values(input)
    );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("interval", interval);
    formData.append("dateField", field);
    formData.append("columnsToAggregate", columnsToAggregate.toString()); //array values must be  converted to string before being added to form
    const results = await fetch("http://localhost:5000/timeseries/csv", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
    const json = await results.json();
    setData(json);
  };
  const handleField = (e: ChangeEvent<HTMLInputElement>): void => {
    setField(e.target.value);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  };

  const handleInterval = (e: ChangeEvent<HTMLInputElement>): void => {
    setInterval(e.target.value);
  };
  return (
    <>
      <h1>Historical Data Aggregation</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          name="dateField"
          label="Date Field"
          id="field"
          type="text"
          required
          value={field}
          onChange={handleField}
        />
        <Input
          name="interval"
          label="Interval"
          id="interval"
          type="text"
          required
          value={interval}
          onChange={handleInterval}
        />
        <DynamicInput
          inputFields={inputFields}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
          handleInputChange={handleInputChange}
        />
        <Input
          name="file"
          label="Upload File"
          id="file"
          type="file"
          required
          accept=".csv, text/csv"
          onChange={handleFile}
        />
        <div>
          <button className="m-4 w-1/4 self-centre">Submit</button>
        </div>
      </form>
      {chartData?.data.datasets &&<p>chartData?.datasets</p> &&<Bar data={chartData.data} />}
    </>
  );
};

export default MyForm;
