"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Links = {
  shortenedUrl: string;
  originalLink: string;
  clicks: number;
};

export const columns: ColumnDef<Links>[] = [
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey:"originalLink",
    header:"Original Link"
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
];
