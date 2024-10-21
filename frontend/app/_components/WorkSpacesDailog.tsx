"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxiosInstance from "@/utils/axios";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const WorkSpacesDialog: React.FC = () => {
  const router=useRouter();
  const [workspaceName, setWorkspaceName] = useState("");

  const createWorkSpace = async () => {
    try {
      await AxiosInstance.post("/api/user/workspace", { name: workspaceName });
      setWorkspaceName("");
      toast.success("New Workspace Created");
      window.location.reload()
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-md cursor-pointer flex items-center gap-x-2 ">
          <Plus size={16} />
          <span className="text-sm text-gray-700">Add New Workplace</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-nowrap">Add New Workspace</DialogTitle>
          <DialogDescription>
            Give Your Workspace a name and click on create.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="New Workspace"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)} 
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createWorkSpace}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkSpacesDialog;
