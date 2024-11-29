"use client";
import React from "react";
import CreateForm from "../dashboard/_components/CreateForm"
import ListOfForm from "../dashboard/_components/ListOfForm"

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
      <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Dashboard
        <CreateForm/>
      </h2>
      {/* list of Form */}
      <ListOfForm/>
    </div>
  );
}
