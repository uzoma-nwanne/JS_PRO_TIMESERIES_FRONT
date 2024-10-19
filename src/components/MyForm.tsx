import React, { ChangeEvent, FormEvent, useState} from "react";
import Input from "./Input";
import DynamicInput from "./DynamicInput";
import BarChart from "./BarChart";

const MyForm: React.FC = () => {
  const [field, setField] = useState("");
  const [inputFields, setInputFields] = React.useState<{ column: string}[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState({ data: [] }); //data from API
  const [interval, setInterval] = useState<string>("");
  
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
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
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
      {data?.data.length && <BarChart data={data.data} inputFields={inputFields} />}
    </>
  );
};

export default MyForm;
