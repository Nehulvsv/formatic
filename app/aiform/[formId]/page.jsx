"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { jsonForms } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import FormUi from "../../edit-form/_components/FormUi";
import Link from "next/link";

function LiveAiForm({ params }) {
    const [record, setRecord] = useState(null); // Initialize as null or an empty array
    const [jsonForm, setJsonForm] = useState(null); // Initialize as null

    useEffect(() => {
        if (params?.formId) {
            getFormData();
        }
    }, [params]);

    const getFormData = async () => {
        try {
            const result = await db
                .select()
                .from(jsonForms)
                .where(eq(jsonForms.id, Number(params?.formId)));

            // Check if result is not empty
            if (result.length > 0) {
                setRecord(result[0]);
                setJsonForm(JSON.parse(result[0].jsonform)); // Assuming jsonform is an object
            } else {
                // Handle case when no record is found
                setRecord(null);
                setJsonForm(null);
            }
        } catch (error) {
            console.error("Error fetching form data:", error);
            // Handle error as needed
            setRecord(null);
            setJsonForm(null);
        }
    };


    return (
        record && jsonForm ? (
            <div className="flex items-center justify-center h-full p-10" style={{ backgroundImage: record?.background }}>
                <FormUi
                    jsonForm={jsonForm}
                    onDeleteField={() => console.log('')}
                    onFormFieldUpdate={() => console.log('')}
                    selectedTheme={record?.theme}
                    editable={false}
                    formId={record?.id}
                    
                />
            <Link href={'/'} className=" fixed bottom-3 left-3 flex bg-black text-white items-center justify-center gap-2 font-bold cursor-pointer rounded-full px-1 py-1">
             <div className="bg-white rounded-full">
              <img src="/logo.svg" alt="logo" className="w-7 h-7   "/>
              </div> 
              <h2>Create Your Own Ai Form</h2>
            </Link>
            </div> 
        ) : (
            <div className="w-full h-screen flex items-center justify-center"><span className="loading loading-infinity loading-lg w-[100px] h-[100px]"></span></div>
        )
    );
}

export default LiveAiForm;
