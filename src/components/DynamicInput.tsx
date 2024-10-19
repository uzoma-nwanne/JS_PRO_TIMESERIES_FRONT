import React, { ChangeEvent } from "react";
type Col = {
  column: string;
};
interface DynamicProps {
  inputFields: Col[];
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

const DynamicInput: React.FC<DynamicProps> = ({
  inputFields,
  handleAddField,
  handleRemoveField,
  handleInputChange,
}) => {
  return (
    <div className="flex flex-col gap-x-1 gap-y-3 ">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-x-1 gap-y-3">
        <label
          className="col-span-1 md:col-span-2 font-bold text-lg justify-items-start"
          htmlFor={"field"}
        >
          Columns To Aggregate:
        </label>
        <p className="col-span-1 md:col-span-2">Columns To Aggregate</p>
      </div>
      {inputFields.map((field, index) => (
        <div key={index} className="grid grid-cols-6 gap-x-1 gap-y-3">
          {/* <Input
            name={"field"}
            label={""}
            id={"field"}
            type="text"
            required
            value={field.column}
            onChange={e=>handleInputChange(e,index)}
          /> */}
          <label
            className="col-span-2 font-bold text-lg justify-items-start"
            htmlFor={"field"}
          ></label>
          <input
            name={"field"}
            type={"text"}
            id={"field"}
            required
            onChange={(e) => handleInputChange(e, index)}
            value={field.column}
            className="col-span-3 p-2 outline-none bg-white
      font-light
      border-2
      rounded-md justify-items-start"
          />
          <button onClick={() => handleRemoveField(index)} className="">
            -
          </button>
        </div>
      ))}
      <div className="grid grid-cols-6 gap-x-1 gap-y-3">
        <button
          onClick={handleAddField}
          className="col-start-3"
        >
          Add Field
        </button>
      </div>
    </div>
  );
};

export default DynamicInput;
