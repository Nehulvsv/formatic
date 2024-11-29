"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../configs/index";
import { jsonForms } from "../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import Controller from "../_components/Controller";
import toast from "react-hot-toast";
import Link from "next/link";
import { RWebShare } from "react-web-share";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState([]);
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState(
    " "
  );
  const route = useRouter();
  const getFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(
        and(eq(jsonForms.id, params.formId)),
        eq(jsonForms.createdBy, user.primaryEmailAddress?.emailAddress)
      );
   
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedTheme(result[0].theme)
    setSelectedBackground(result[0].background)
    setRecord(result[0]);
  };

  useEffect(() => {
    user && getFormData();
  }, [user]);
  useEffect(() => {
    setJsonForm(jsonForm);
    updateJsonFormDb();
  }, [updateTrigger]);

  const onFormFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormDb = async () => {
    const result = await db
      .update(jsonForms)
      .set({ jsonform: jsonForm })
      .where(
        and(eq(jsonForms.id, record.id)),
        eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      );

    toast.success("Updated!");
  };
  const onDeleteField = (i) => {
    const result = jsonForm.fields.filter((items, index) => index !== i);
    jsonForm.fields = result;

    setUpdateTrigger(Date.now());
  };

  const updateControllerField = async (value, colName) => {
    const result = await db
      .update(jsonForms)
      .set({ [colName]: value })
      .where(
        and(eq(jsonForms.id, record.id)),
        eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    toast.success("Updated!");
  };
  return (
    <div className="p-10 ">
      <div className="flex items-center justify-between">

      <div>
      <h2
        className="flex gap-2 my-5 cursor-pointer hover:font-bold text-black"
        onClick={() => route.back()}
        >
        <ArrowLeft />
        Back
      </h2>
        </div>
        <div className="flex gap-2 ">
         <Link href={"/aiform/"+record?.id} target="_black">
         
<button className="btn btn-active btn-primary"> <SquareArrowOutUpRight className="h-5 w-5"/>Preview</button>
         </Link> 
         <RWebShare
          data={{
            text: record.formTitle || record.title ||  'Check out this form!',
            url: `${window.location.origin}/aiform/${record?.id}`,
            title: 'Share Form',
          }}
        >
<button className="btn btn-active btn-primary"><Share2 className="h-5 w-5"/>Share</button>
          </RWebShare>
        </div>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-md shadow-sm">
          <Controller
            setSelectedTheme={(value) => {
              setSelectedTheme(value);
              updateControllerField(value, "theme");
            }}
            setSelectedBackground={(value)=> {setSelectedBackground(value) ; updateControllerField(value, "background")} }
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg  p-5 flex justify-center items-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            onFormFieldUpdate={onFormFieldUpdate}
            onDeleteField={(i) => onDeleteField(i)}
            selectedTheme={selectedTheme}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
