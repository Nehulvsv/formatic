import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../configs';
import { userResponses } from '../../../../configs/schema';
import { count, eq } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function FormListItemRespo({form,count}) {
    const formData = JSON.parse(form.jsonform); 
    const [userRespo , setUserRespo] = useState([])
    const [loading, setLoading ] = useState(false)
    let jsonRespo = [];
    const exportData = async() => {
      setLoading(true)
      const result = await db.select().from(userResponses).where(eq(userResponses.formRef,form.id))
     
      if(result) {
        setLoading(false)
        result.forEach((item)=>{
          jsonRespo.push(JSON.parse(item.jsonResponse))
        })
        setUserRespo(result)
      }
      exportToExcel(jsonRespo)
    }
    //  convert json to exal and download it
    const exportToExcel = async () => {
      // Flatten the arrays into strings
      const transformedData = jsonRespo.map(item => ({
        ...item,
        programmingLanguages: item.programmingLanguages.join(', '),
        frameworks: item.frameworks.join(', '),
        databases: item.databases.join(', ')
      }));
    
      // Convert transformed data to worksheet
      const workSheet = XLSX.utils.json_to_sheet(transformedData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
      
      // Set filename
      const fileName = (formData.formTitle || formData.title || 'DataSheet') + '.xlsx';
      XLSX.writeFile(workBook, fileName);
    };

  //   useEffect(()=>{
  //     respoCounts()
  //   },[])

  //   const respoCounts = async() => {
  //     const result = await db.select({ value: count()}).from(userResponses).where(eq(userResponses.formRef , formData.id))
  //     // console.log('result count  ===== ',result); 
  //     console.log('Count:', result[0]?.value)
  // }
    

  return (
    <div
    className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
    style={{
      background: "linear-gradient(to right, #f0f0f0, #e0e0e0)",
    }}
  >
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          {formData.formTitle || formData.title || "Untitled Form"}
        </h2>
        {/* <Trash
          className="text-red-500 cursor-pointer hover:scale-105 transition-all"
          onClick={() => setIsModalOpen(true)} // Open the modal on click
        /> */}
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {formData.subheading || "No description available."}
      </p>
    </div>

    <div className="flex justify-between items-center mt-5">
    
      <h2 className=" text-sm">
        <strong> {count}</strong> Responses
      </h2>

 
        <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600" onClick={()=>exportData()} disabled={loading}>
          {/* <Export className="mr-1" /> */}
          {loading ? <Loader2 className='animate-spin' /> : "Export"}
        </button>
      
    </div>

    {/* Modal for Delete Confirmation */}
    {/* {isModalOpen && (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you really want to delete this form? This action cannot be undone.</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={()=>handleDelete()}
            >
              Delete
            </button>
            <button
              className="btn"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )} */}
  </div>
  )
}
