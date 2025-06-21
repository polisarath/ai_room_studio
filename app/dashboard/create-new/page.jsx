"use client";

import React, { useContext, useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AddittionalReq from "./_components/AddittionalReq";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { UserDetailContext } from "@/app/_context/UserDetailsContext";
import { eq } from "drizzle-orm";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  // const [outputResult,setoutputResult]=useState();
  const [Aioutputimage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImageUrl] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // const [UserDetails, setUserDetails] = useState(null);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log(formData);
  };

  const GenerateAiImage = async () => {
    setloading(true);
    const rawImageUrl = await SaveImageToFirebase();
    const result = await axios.post("/api/redesign-room", {
      imageUrl: rawImageUrl,
      roomType: formData?.roomType,
      designType: formData?.designType,
      addittionalReq: formData?.additionalReq,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
    await updateUserCredits();
    setAiOutputImage(result.data.result); //output image url
    setOpenOutputDialog(true);
    setloading(false);
  };

  const SaveImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "room-redesign/" + fileName);
    await uploadBytes(imageRef, formData.image).then((resp) => {
      console.log("file uploaded");
    });

    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);
    setOrgImageUrl(downloadUrl);
    return downloadUrl;
  };
  // const updateUserCredits = async () => {

  //   const result= await db.update(Users).set({
  //     credits:UserDetails?.credits-1
  //   }).returning({id:Users.id})
  //   if (result){
  //     setUserDetails(UserDetails?.credits-1)
  //     return result[0].id
  //   }
  // };
  const updateUserCredits = async () => {
    if (!userDetail || typeof userDetail.credits !== "number") {
      console.error("Invalid credit value:", userDetail?.credits);
      return;
    }

    try {
      const result = await db
        .update(Users)
        .set({ credits: userDetail.credits - 1 })
        .where(eq(Users.id, userDetail.id))
        .returning({ id: Users.id }); // ✅ returns updated rows

      if (result && result.length > 0) {
        setUserDetail({
          ...userDetail,
          credits: userDetail.credits - 1,
        });
        return result[0].id;
      } else {
        console.warn("No user updated or no result returned.");
        return null;
      }
    } catch (err) {
      console.error("Error updating credits:", err);
      return null;
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl  text-violet-700 text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style and
        watch as AI instantly reimagines your environment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2  mt-10 gap-10">
        {/* image selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />

        {/* form input */}
        <div>
          {/* room type */}
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />

          {/* design type */}
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          {/* additional requirements */}
          <AddittionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />
          {/* buton to generate image */}
          <Button
            onClick={GenerateAiImage}
            className="mt-5 w-full  bg-violet-600 hover:bg-violet-700 "
          >
            Generate
          </Button>
          <p className="text-sm text-gray-600 p-5 mb-50">
            NOTE: 1 Credit will use to redesign your room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={Aioutputimage}
      />
    </div>
  );
}

export default CreateNew;
