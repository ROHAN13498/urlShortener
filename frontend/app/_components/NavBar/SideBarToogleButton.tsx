import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";

const SideBarToogleButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center">
      <button onClick={toggleSidebar}>
        <Menu className="" strokeWidth={3} />
      </button>

    </div>
  );
};

export default SideBarToogleButton;
