import AxiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import WorkSpacesDialog from "./WorkSpacesDailog";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

  function WorkspaceItem({ name }: { name: string }) {
    const router = useRouter();
    const pathName = usePathname();
    const currentWorkSpace = pathName.split("/")[2];

    return (
      <button
        onClick={() => {
          router.push(`/dashboard/${name}`);
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all",
          { "bg-slate-300/40": name === currentWorkSpace }
        )}
      >
        <span className="h-2 w-2 rounded-full bg-sky-500" />
        <span>{name}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-1">
        {workSpaces.map((workspace, index) => (
          <WorkspaceItem key={index} name={workspace.name} />
        ))}
      </div>
      <div className="mt-4">
        <WorkSpacesDialog fetchWorkspaces={fetchWorkspaces} />
      </div>
    </div>
  );
};

export default WorkSpaces;
