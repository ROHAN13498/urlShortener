'use client'

import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  BriefcaseBusiness,
  ChevronDown,
  Link as LinkIcon,
  Settings,
} from "lucide-react"
import WorkSpaces from "./WorkSpaces"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-background/95">
      <SidebarHeader className="p-4 flex items-center">
        <a
          className="flex items-center gap-2 rounded-md px-2 py-1 text-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground"
          href="/"
        >
          <LinkIcon className="h-5 w-5 text-blue-500" />
          <span className="font-semibold tracking-wide">ShortLink</span>
        </a>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <Collapsible defaultOpen className="space-y-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground group">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4" />
                <span>Workspaces</span>
              </div>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              <WorkSpaces />
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1">
            <a className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              <span className="select-none">Settings</span>
            </a>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground">
        © 2024 ShortLink
      </SidebarFooter>
    </Sidebar>
  )
}