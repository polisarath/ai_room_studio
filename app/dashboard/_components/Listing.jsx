"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

import RoomDesignOutput from "./RoomDesignOutput";
import { index } from "drizzle-orm/mysql-core";

const Listing = () => {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    user && GetUserRoomList();
  }, [user]);
  const GetUserRoomList = async () => {
    const result = await db
      .select()
      .from(AiGeneratedImage)
      .where(
        eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress)
      );
    setUserRoomList(result);
    console.log(result);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl"> Hello, {user?.fullName}</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="mt-5 bg-violet-600 hover:bg-violet-700">
            + Redesgin Room
          </Button>
        </Link>
      </div>

      {/* {userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <EmptyState />
        

        {userRoomList.map((room,index)=>(
          <RoomDesignOutput  key={index} room={room} index={index}/>
        ))}
        </div>
      )} */}

      {userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <h2 className="font-medium text-violet-700 text-xl mb-5">
            Room Studio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room, index) => (
              <RoomDesignOutput key={index} room={room} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
