"use client";

import React, { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import AiOutputDialog from "../_components/AiOutputDialog";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";

const RoomDesignOutput = ({ room }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onClickHandler = () => {
    setOpenDialog(true);
  };

const downloadImage = (url, roomType, designType) => {
  const filename = `ai-room-${roomType}-${designType}.png`;
  const isFirebase = url.includes("firebasestorage.googleapis.com");

  if (isFirebase) {
    // Direct download using browser
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // filename hint for browser
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Use API proxy for Replicate or any other external URL
    const apiUrl = `/api/download-image?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    const link = document.createElement("a");
    link.href = apiUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


  return (
    <div
      className="shadow-md round-md cursor-pointer"
      onClick={() => onClickHandler()}
    >
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room?.aiImage,
        }}
        secondImage={{
          imageUrl: room?.orgImage,
        }}
      />
      <div className="p-4">
        <h2> 🏞️ Room Type: {room.roomType}</h2>
        <h2> 🖼️ Design Type: {room.designType}</h2>
      </div>
      <Button
        className="w-full mt-2"
        variant="outline"
        onClick={() =>
          downloadImage(room.aiImage, room.roomType, room.designType)
        }
      >
        Download AI Room
      </Button>
      {/* <Button
        className="w-full mt-2"
        variant="outline"
        onClick={() =>
          downloadImage(
            room.replicateImage || room.aiImage,
            room.roomType,
            room.designType
          )
        }
      >
        Download AI Room
      </Button> */}

      <Button
        className="w-full mt-2"
        variant="secondary"
        onClick={() => {
          const subject = encodeURIComponent(
            "Check out this AI-Generated Room Design!"
          );
          const body = encodeURIComponent(
            `Hey, check out this AI-generated room design:\n\n${room.aiImage}\n\nRoom Type: ${room.roomType}\nDesign Type: ${room.designType}`
          );
          window.location.href = `mailto:?subject=${subject}&body=${body}`;
        }}
      >
        Share via Email
      </Button>

      {/* <AiOutputDialog
        aiImage={room.aiImage}
        orgImage={room.orgImage}
        closeDialog={() => setOpenDialog(false)}
        openDialog={openDialog}
      /> */}
    </div>
  );
};

export default RoomDesignOutput;
