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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface WorkSpacesDialogProps {
  fetchWorkspaces: () => Promise<void>;
}

const WorkSpacesDialog: React.FC<WorkSpacesDialogProps> = ({ fetchWorkspaces }) => {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");

  const createWorkSpace = async () => {
    try {
      await AxiosInstance.post("/api/user/workspace", { name: workspaceName });
      toast.success("New Workspace Created");
      await fetchWorkspaces();  // Update the workspace list
      router.push(`/dashboard/${workspaceName}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setWorkspaceName("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-md cursor-pointer flex items-center gap-x-2 ">
          <Plus size={16} />
          <span className="text-sm text-gray-700 text-nowrap">Add New Workspace</span>
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
