"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import CreateLink from "./_components/CreateLink";

const page = ({ params }: { params: { workspace: string } }) => {
  const workspace = params.workspace;
  const router=useRouter();
  return (
    <div className="m-5 flex flex-row justify-between p-10">
      <h1 className="font-bold text-4xl sm:text-3xl md:text-5xl tracking-tight">
        Links
      </h1>
      <div className="ml-auto mr-20">
        <CreateLink/>
      </div>
    </div>
  );
};

export default page;
