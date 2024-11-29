"use client";

import React, { useRef, useState } from "react";
import FieldEdit from "./FieldEdit"; 
import Select from "react-select";
import { db } from "../../../configs";
import { userResponses } from "../../../configs/schema";
import moment from "moment";
import toast from "react-hot-toast";

function FormUi({ jsonForm, onFormFieldUpdate, onDeleteField, selectedTheme, editable , formId=0}) {
  const [formData, setFormData] = useState({});
  let formRef = useRef()

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle select change for react-select
  const handleSelectChange = (name, selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption?.value || "",
    }));
  };

  // Handle form submission
  const handleOnFormSubmit = async(e) => {
    e.preventDefault();
   

    const result =  await db.insert(userResponses)
    .values({
      jsonResponse:formData,
      createdAt:moment().format('DD/MM/yyy'),
      formRef: formId,
    })

    if (result) {
      formRef.reset();
     toast.success('Form Submitted Successfully!')
    } else {
      toast.error('Failed to Submit Form!') 
    }
  };

  return jsonForm.fields ? (
    <form
    ref={ (e)=> formRef = e}
      onSubmit={handleOnFormSubmit}
      className="border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
    >
      <h2 className="font-bold text-3xl text-pink-600 text-center">
        {jsonForm.title || "Default Title"}
      </h2>
      <h3 className="text-sm text-gray-400 text-center">
        {jsonForm.subheading || "Default Subheading"}
      </h3>
      {jsonForm.fields.map((field, i) => {
        const options =
          field.options?.map((val) => ({
            value: val,
            label: val,
          })) || [];

        return (
          <div key={i} className="flex gap-2">
            {field.type === "select" ? (
              <div className="my-2 w-full">
                <label className="text-sm text-gray-500">{field.label}</label>
                <Select
                  className="w-full max-w-xs bg-transparent"
                  options={options}
                  onChange={(selectedOption) =>
                    handleSelectChange(field.name, selectedOption)
                  }
                  required = {field.required}
                />
              </div>
            ) : field.type === "radio" ? (
              <div className="my-2">
                <label className="text-sm text-gray-500">{field.label}</label>
                {field.options.map((val, j) => (
                  <div key={j} className="flex items-center">
                    <input
                      type="radio"
                      id={`${field.name}-${j}`}
                      name={field.name}
                      value={val}
                      className="mr-2"
                      required = {field.required}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`${field.name}-${j}`}
                      className="text-sm text-gray-500"
                    >
                      {val}
                    </label>
                  </div>
                ))}
              </div>
            ) : field.type === "checkbox" ? (
              <div className="my-2 w-full">
                <label className="text-sm text-gray-500">{field.label}</label>
                {field.options.map((val, j) => (
                  <div key={j} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${field.name}-${j}`}
                      name={field.name}
                      value={val}
                      className="mr-2"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          [field.name]: isChecked
                            ? [...(prevData[field.name] || []), val]
                            : (prevData[field.name] || []).filter(
                                (item) => item !== val
                              ),
                        }));
                      }}
                    />
                    <label
                      htmlFor={`${field.name}-${j}`}
                      className="text-sm text-gray-500"
                    >
                      {val}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="my-2 w-full">
                <label className="text-sm text-gray-500">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  required={field?.required}
                  className="appearance-none block w-full text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#000000] bg-transparent"
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div>
              {editable && (
                <FieldEdit
                  defaultValue={field}
                  onDeleteField={() => onDeleteField(i)}
                  onUpdate={(value) => onFormFieldUpdate(value, i)}
                />
              )}
            </div>
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}

export default FormUi;
