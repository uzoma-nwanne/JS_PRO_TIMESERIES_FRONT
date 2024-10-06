import React, { ChangeEvent } from "react";
import Input from "./Input";

const DynamicInput: React.FC = () => {
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
