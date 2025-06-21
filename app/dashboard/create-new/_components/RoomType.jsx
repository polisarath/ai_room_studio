import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoomType = ({selectedRoomType}) => {
  return (
    <div>
      <label htmlFor="" className="text-slate-400">select room type</label>
      <Select onValueChange={(value)=>selectedRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Living_Room">Living Room</SelectItem>
          <SelectItem value="Bed_Room">Bed Room</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Hall">Hall</SelectItem>
          <SelectItem value="Gaming">Gaming Room</SelectItem>
          

        </SelectContent>
      </Select>
    </div>
  );
};

export default RoomType;
