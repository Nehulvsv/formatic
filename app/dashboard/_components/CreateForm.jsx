// Explicitly mark this as a Client Component
"use client";

// Import React
import React, { useState } from "react";
import { aiChatSession } from "../../../configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { jsonForms } from "../../../configs/schema";
import { db } from "../../../configs/index";
import moment from "moment";
import { useRouter } from "next/navigation";
// import { Button } from "@shadcn-ui/components/ui/Button"

// import { Button } from "@/components/ui/Button"

// Define the CreateForm component
export default function CreateForm() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const route = useRouter();
  // If user data is not loaded yet or the user is not signed in, return early
  if (!isLoaded || !isSignedIn) {
    return (
      <button className=" bg-white ">
        <span className="loading loading-infinity loading-lg"></span>
      </button>
    );
  }

  const prompt =
    "Please generate a JSON object representing a form based on the provided description. The JSON should include the form title, subheading, form name, field names, placeholders, labels, field types, whether each field is required, and any additional necessary form fields.";

  const onCreateForm = async () => {
    setLoading(true);
    const result = await aiChatSession.sendMessage(
      "Description" + userInput + prompt
    );

    if (result.response.text()) {
      const res = await db
        .insert(jsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy:
            user?.primaryEmailAddress?.emailAddress || "default@example.com", // Fallback if undefined
          createdAt: moment().format("YYYY-MM-DD"), // Standard date format
        })
        .returning({ id: jsonForms.id });

      if (res[0].id) {
        route.push("/edit-form/" + res[0].id);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="bg-primary hover:bg-blue-700 text-white text-lg py-2 px-4 border rounded-lg"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        + Create Form
      </button>

      {/* Modal dialog */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Button to close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create New Form</h3>
          <textarea
            className="textarea textarea-accent p-4 w-full mt-2 my-2"
            placeholder="Write Description For Your Form"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          ></textarea>
          <div className="flex items-center justify-end gap-3">
            <form method="dialog">
              <button className="btn btn-error">Cancel</button>
            </form>
            <button
              disabled={loading}
              className="btn btn-success"
              onClick={onCreateForm}
            >
              Create
            </button>
            {/* <Button variant="outline">Button</Button> */}
          </div>
        </div>
      </dialog>
    </div>
  );
}
