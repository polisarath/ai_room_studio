import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }) => {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <div className="bg-white flex flex-col items-center my-10 justify-center">
            <Image
              src={"/loading.gif"}
              alt="loading"
              width={200}
              height={200}
              unoptimized
            />
            <h2>Redesigning Your Room ........ Do Not Refresh</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomLoading;
