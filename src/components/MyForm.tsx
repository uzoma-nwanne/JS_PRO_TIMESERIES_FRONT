import React, { ChangeEvent, FormEvent, useState} from "react";
import Input from "./Input";
import DynamicInput from "./DynamicInput";
//import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
const MyForm: React.FC = () => {
  const [field, setField] = useState("");
  const [inputFields, setInputFields] = React.useState<{ column: string }[]>([
    { column: "" },
  ]);

  const handleAddField = () => {
    const newField = { column: "" };
    setInputFields([...inputFields, newField]);
  };

  const handleRemoveField = (index: number) => {
    const data = [...inputFields];
      data.splice(index, 1);
      setInputFields(data);
    
  };

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>, index:number)=>{
    const data = [...inputFields];
    data[index]=  {column:e.target.value};
    setInputFields(data)
  }
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
 console.log(inputFields)
  };
  const handleField = (e:ChangeEvent<HTMLInputElement>):void => {
    setField(e.target.value);
   // console.log(field)
  };
  return (
    <>
      <h1>Historical Data Aggregation</h1>
      <form  className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          name="field"
          label="Field"
          id="field"
          type="text"
          required
          value={field}
          onChange={handleField}
        />
        <DynamicInput inputFields ={inputFields} handleAddField={handleAddField} handleRemoveField={handleRemoveField} handleInputChange ={handleInputChange}/>
        <button>Submit</button>
      </form>
    </>
  );
};

export default MyForm;
