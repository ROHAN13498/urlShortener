"use client";
import AxiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import WorkSpacesDialog from "./WorkSpacesDailog";



interface Workspace {
  name: string;
}

const WorkSpaces = () => {
  const [workSpaces, setWorkspaces] = useState<Workspace[]>([]);

  const fetchWorkspaces = async () => {
    try {
      const response = await AxiosInstance.get("/api/user/workspaces");
      setWorkspaces(response.data);
    } catch (error: any) {
      console.error("Error fetching the workspaces", error.message);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <ul className="space-y-2 w-full max-w-md">
        {workSpaces.map((workspace, index) => (
          <li
            key={index}
            className="bg-gray-50 rounded-md p-2 transition-colors duration-200 hover:bg-gray-300"
          >
            <h2 className="text-sm font-medium text-gray-800">{workspace.name}</h2>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <WorkSpacesDialog  /> 
      </div>
    </div>
  );
};

export default WorkSpaces;
