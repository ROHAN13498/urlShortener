"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  ChevronDown,
  LucideLink,
} from "lucide-react";
import WorkSpaces from "./WorkSpaces";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <Sidebar>
        <SidebarHeader className="py-4 px-6 bg-white shadow-sm rounded-lg">
          <a
            className="flex items-center justify-center gap-x-3 hover:bg-neutral-100 p-2 rounded-lg transition-colors duration-300"
            href="/"
          >
            <LucideLink className="h-6 w-6 text-blue-500" />
            <span className="text-neutral-900 font-bold text-lg tracking-wide">
              ShortLink
            </span>
          </a>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <div className="flex items-center gap-x-3 text-slate-800 m-2">
                  <BriefcaseBusiness size={20} strokeWidth={1.5} />
                  <h1 className="text-lg font-bold whitespace-nowrap">Workplace 1</h1> {/* Prevent wrapping */}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="ml-2 p-2 rounded-md">
              <WorkSpaces />
            </CollapsibleContent>
          </SidebarGroup>
          <h1 className="text-lg font-semibold whitespace-nowrap">Settings</h1> {/* Prevent wrapping and adjust font size */}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </Collapsible>
  );
}
