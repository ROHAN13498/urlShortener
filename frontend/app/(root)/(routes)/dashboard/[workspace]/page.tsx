"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import CreateLink from "./_components/CreateLink";

const page = ({ params }: { params: { workspace: string } }) => {
  const workspace = params.workspace;
  const router = useRouter();

  return (
    <div className="m-5 flex flex-row items-center justify-between p-6">
      <h1 className="font-bold text-4xl sm:text-3xl md:text-5xl tracking-tight">
        Links
      </h1>
      <div className="ml-4 sm:ml-6">
        <CreateLink />
      </div>
    </div>
  );
};

export default page;
