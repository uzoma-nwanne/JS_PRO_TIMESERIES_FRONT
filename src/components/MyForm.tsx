import React, { ChangeEvent, FormEvent, useState} from "react";
import Input from "./Input";
import DynamicInput from "./DynamicInput";

const MyForm: React.FC = () => {
  const [field, setField] = useState("");
  const [inputFields, setInputFields] = React.useState<{ column: string }[]>([
    { column: "" },
  ]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState({});
  const [interval, setInterval] = useState<string>('');

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
    if(typeof file === 'undefined') return ;
    const columnsToAggregate = inputFields.flatMap((input)=>Object.values(input));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('interval', interval);
    formData.append('dateField', field);
    formData.append('columnsToAggregate', columnsToAggregate.toString());
    const results = await fetch("http://localhost:5000/timeseries/csv",{
        method:"POST",
        body:formData
    })
    const json = await results.json();
    setData(json)
    console.log(data)
  };
  const handleField = (e: ChangeEvent<HTMLInputElement>): void => {
    setField(e.target.value);
    // console.log(field)
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0])
  };

  const handleInterval = (e:ChangeEvent<HTMLInputElement>):void =>{
    setInterval(e.target.value);
  }
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
    </>
  );
};

export default MyForm;
