"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState(null);

  // const [file, setFile] = useState(null);
  // const onFileSelected = (event) => {
  //   const selectedFile = event.target.files[0];
  //   console.log(event.target.files[0]);
  //   setFile(event.target.files[0]);
  //   setFile(selectedFile);
  //   selectedImage (selectedFile)
  // };
  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile); // Set file state once
    selectedImage(selectedFile); // Pass file to the parent component
  };
  return (
    <div>
      <label>Select Image of Your Room</label>
      <div className=" mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border rounded-xl border-dotted flex justify-center border-b-violet-500 bg-slate-200 cursor-pointer hover:shadow-lg 
            ${file && "p-0 bg-white"}`}
          >
            {!file ? (
              <Image src={"/upload.jpeg"} width={70} height={70} alt="upload" />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover"
                alt="selected"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
