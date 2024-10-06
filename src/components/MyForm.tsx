import React, { ChangeEvent, FormEvent, useState} from "react";
import Input from "./Input";
import DynamicInput from "./DynamicInput";
//import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
const MyForm: React.FC = () => {
  const [field, setField] = useState("");

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
        <DynamicInput />
      </form>
    </>
  );
};

export default MyForm;
