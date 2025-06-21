"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <Image src={"/INTERIOR DESIGN.png"} width={400} height={400} alt="empty"/>

      <h2 className=" font-medium text-xl text-gray-500 mt-5">
        Create New AI Interior Design For Your Room
      </h2>
      <Link href={"/dashboard/create-new"}>
        <Button className="mt-5 bg-violet-600 hover:bg-violet-700">
          + Redesgin Room
        </Button>
      </Link>
    </div>
  );
}

export default EmptyState;
