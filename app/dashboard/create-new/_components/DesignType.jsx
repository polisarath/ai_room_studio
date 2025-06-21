"use client"
import Image from "next/image";
import React, { useState } from "react";

const DesignType = ({selectedDesignType}) => {
  const Designs = [
    {
      name: "Modern",
      image: "/modern.avif",
    },
    {
      name: "Japandi",
      image: "/Japandi.avif",
    },
    {
      name: "Midcentury Modern",
      image: "/MidcenturyModern.avif",
    },
    {
      name: "Rustic Modern",
      image: "/Rustic.avif",
    },
    {
      name: "Minimal",
      image: "/minimal.webp",
    },
    {
      name: "Traditional",
      image: "/Traditional.avif",
    },
    {
        name: "Palm Beach",
        image: "/plam.avif",
      },
      {
        name: "Regency",
        image: "/Regency.avif",
      },
  ];
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-5">
      <label className="text-gray-500">Select Interior Room Design</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
        {Designs.map((design, index) => (
          <div key={index} onClick={() => {setSelectedOption(design.name); selectedDesignType(design.name)}}>
          
            <Image
              src={design.image}
              width={100}
              height={100}
              className={`h-[150px] w-[150px] rounded-md hover:scale-105 transition-all cursor-pointer ${
                design.name == selectedOption
                  ? "border-2 border-violet-500 rounded-md p-1"
                  : ""
              }`}
              alt="design_type"
            />

            <h2>{design.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignType;
