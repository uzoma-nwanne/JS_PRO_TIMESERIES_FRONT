import React, { ChangeEvent } from "react";
import Input from "./Input";

type Col = {
    column:string
}
interface DynamicProps{
    inputFields: Col[]
    handleAddField: ()=>void;
    handleRemoveField:(index:number)=>void;
    handleInputChange: (e:ChangeEvent<HTMLInputElement>, index:number)=>void;
}

const DynamicInput: React.FC<DynamicProps> = ({inputFields, handleAddField, handleRemoveField, handleInputChange}) => {
  return (
    <div>
      {inputFields.map((field, index) => (
        <div key={index} className="flex flex-row">
          <Input
            name={"field"}
            label={"Field"}
            id={"field"}
            type="text"
            required
            value={field.column}
            onChange={e=>handleInputChange(e,index)}
          />
          {index === 0 ? '':<button onClick={() => handleRemoveField(index)}
            className="p-2 border-2 w-1/4 m-4"> Remove Field</button>}
        </div>
      ))}
      <button onClick={handleAddField} className="w-1/4 items-center">Add Field</button>
    </div>
  );
};

export default DynamicInput;
