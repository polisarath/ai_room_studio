import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});
export async function POST(req) {
  // const {user}=useUser()
  const { imageUrl, roomType, designType, addittionalReq, userEmail } =
    await req.json();
 if (!imageUrl || !roomType || !designType || !userEmail) {
    return NextResponse.json({
      error: "Missing required fields: imageUrl, roomType, designType, or userEmail",
    }, { status: 400 });
  }
  try {
    const input = {
      image: imageUrl,
      prompt:
        "a" +
        roomType +
        "with a" +
        designType +
        "style interior" +
        addittionalReq,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log("Replicate output:", output);

    // convert output url to base64
    const base64Image = await ConvertImageToBase64(output);
    console.log("Base64 image ready");
    // save to base64 to firebase
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "room-redesign/" + fileName);
    // await uploadString(storageRef, base64Image, "data_url");
    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadUrl);
   


    //save all to database
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType: roomType,
        designType: designType,
        orgImage: imageUrl,
        aiImage: downloadUrl,
        // userEmail:user?.primaryEmailAddress?.emailAddress
        userEmail: userEmail,
      })
      .returning({ id: AiGeneratedImage.id });
    console.log(dbResult);
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("Error occurred:", e); // ✅ Add this
    return NextResponse.json({ error: e });
  }
}
async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
