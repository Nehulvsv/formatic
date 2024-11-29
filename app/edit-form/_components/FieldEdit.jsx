import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";

function FieldEdit({ defaultValue, onUpdate ,onDeleteField}) {
  // Initialize state with the passed defaultValue
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className="flex gap-2 items-center">
      {/* <details className="dropdown">
        <summary className="btn m-1 p-0 bg-transparent border-none hover:bg-transparent">
          {" "}
          <Edit className="text-gray-500 h-4 w-4"></Edit>{" "}
        </summary>
        <div>
          <h3 className="font-bold text-lg">Edit Form</h3>
          <div>
            <label className="text-xs">Label Name</label>
            <input
              type="text"
              defaultValue={defaultValue.label} // Bind the state variable to the input field
              onChange={(e) => setLabel(e.target.value)} // Update the state on input change
              className=" appearance-none block w-72 bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#000000]"
            />
          </div>
        </div>
      </details> */}
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 p-0 bg-transparent border-none hover:bg-transparent"
        >
          <Edit className="text-gray-500 h-4 w-4"></Edit>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 right-0 rounded-box z-[1] w-[400px] p-2 shadow"
        >
          <div>
            <h3 className="font-bold text-lg">Edit Form</h3>
            <div>
              <label className="text-xs">Label Name</label>
              <input
                type="text"
                defaultValue={defaultValue.label} // Bind the state variable to the input field
                onChange={(e) => setLabel(e.target.value)} // Update the state on input change
                className=" appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#000000]"
              />
            </div>
            <div>
              <label className="text-xs">Placeholder Name</label>
              <input
                type="text"
                defaultValue={defaultValue.placeholder} // Bind the state variable to the input field
                onChange={(e) => setPlaceholder(e.target.value)} // Update the state on input change
                className=" appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#000000]"
              />
            </div>
            <br />
            <input
              type="submit"
              value="Update"
              className="btn w-full"
              onClick={() =>
                onUpdate({
                  label: label,
                  placeholder: placeholder,
                })
              }
            />
          </div>
        </ul>
      </div>

      <Trash className="text-red-600 h-4 w-4" onClick={() =>
                onDeleteField()
              }
            ></Trash>
   {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}><Trash className="text-red-600 h-4 w-4"></Trash></button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  <input
              type="submit"
              value="Delete"
              className="btn w-full"
              onClick={() =>
                onDeleteField()
              }
            />
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog> */}
    </div>
  );
}

export default FieldEdit;
