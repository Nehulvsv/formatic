import React, { useState } from 'react';
import { Edit, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../configs';
import { jsonForms } from '../../../configs/schema';
import { and, eq } from 'drizzle-orm';
import toast from 'react-hot-toast';
import { RWebShare } from 'react-web-share';

export default function FormCard({ form, refreshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formData = JSON.parse(form.jsonform);   

  const user =useUser();
  const handleDelete = async() => {
    console.log('hello');
    setIsModalOpen(false);
    const result = await db.delete(jsonForms).where(and(eq(jsonForms.id,form.id),eq(jsonForms.createdBy,user?.user.primaryEmailAddress.emailAddress)))
    if(result){
        toast.success('Form Deleted!!')
        refreshData()
    }
  };

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
          <Trash
            className="text-red-500 cursor-pointer hover:scale-105 transition-all"
            onClick={() => setIsModalOpen(true)} // Open the modal on click
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formData.subheading || "No description available."}
        </p>
      </div>

      <div className="flex justify-between items-center mt-5">
      <RWebShare
          data={{
            text: formData.formTitle || 'Check out this form!',
            url: `${window.location.origin}/aiform/${form.id}`,
            title: 'Share Form',
          }}
        >
        <button className="flex items-center text-gray-500 text-sm">
          <Share className="mr-1" />
          Share
        </button>
        </RWebShare>
        <Link href={'/edit-form/' + form?.id}>
          <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600">
            <Edit className="mr-1" />
            Edit
          </button>
        </Link>
      </div>

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
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
      )}
    </div>
  );
}
