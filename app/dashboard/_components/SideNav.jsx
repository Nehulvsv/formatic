"use client";
import { LibraryBig, LineChart, MessagesSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessagesSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <h2
            key={index}
            className={`${
              path === menu.path && "text-white bg-primary"
            } flex items-center gap-3 p-5 mt-3 cursor-pointer text-gray-500 hover:bg-primary hover:text-emerald-50 rounded-lg`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
        <div className="fixed bottom-10 w-[216px] ">
          <button className="bg-primary hover:bg-blue-700 text-white py-2 px-2 w-full h-full border rounded-lg">
            + Create Form
          </button>
          <div className="my-5">
        <progress
          className="progress progress-black w-full"
          value={70}
          max="100"
        ></progress>
         <h2 className="text-sm mt-2 text-gray-600"><strong>2 </strong> Out Of <strong>3</strong> File Created</h2>
         <h2 className="text-sm mt-3 text-gray-600">Upgrade Your Plan For Unlimited Ai Form Build</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
