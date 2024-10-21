"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AxiosInstance from "@/utils/axios";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";


const AvatarDropDown = () => {
    const router = useRouter()
    const handleLogout=async ()=>{
        await AxiosInstance.post("/api/auth/logout");
        router.push("/auth/login");
    }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
        <AvatarIcon width="35" height="35" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarDropDown;
