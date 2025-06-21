"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailsContext";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { PayPalButtons } from "@paypal/react-paypal-js";
//import { Users } from "lucide-react";
import { Users } from "@/config/schema"; // Adjust based on your folder structure

import { eq } from "drizzle-orm";
//import { useRouter } from "next/router";

const BuyCredits = () => {
  const CreditOption = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 20.99 },
    { credits: 50, amount: 50.99 },
    { credits: 100, amount: 100 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();

  // const onPaymentSuccess = async () => {
  //   console.log("payment sucess");
  //   console.log(userDetail);
  //   //update credit to db
  //   const result = await db
  //     .update(Users)
  //     .set({
  //       credits: userDetail?.credits + selectedOption?.credits,
  //     })
  //     .returning({ id: Users.id });
  //   if (result) {
  //     router.push("/dashboard");
  //   }
  // };
const onPaymentSuccess = async () => {
  if (!userDetail || !selectedOption) {
    console.error("Missing userDetail or selectedOption");
    return;
  }

  console.log("payment success");

  try {
    const newCredits = userDetail.credits + selectedOption.credits;

    const result = await db
      .update(Users)
      .set({ credits: newCredits }) // ✅ FIXED LINE
      .where(eq(Users.id, userDetail.id))
      .returning();
   setUserDetail(prev=>({
    ...prev,
    credits:userDetail.credits + selectedOption.credits
   }))
    router.push("/dashboard");
  } catch (error) {
    console.error("Error updating credits:", error);
  }
};






  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-violet-700">
        Buy More Credits
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Unlock endless possibilities – buy more credits and enhance your
        experience.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CreditOption.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 justify-center items-center p-8 rounded-xl shadow-md border transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              selectedOption?.credits === item.credits
                ? "bg-violet-100 border-violet-500"
                : "bg-white"
            }`}
          >
            <h2 className="text-3xl font-bold text-violet-700">
              {item.credits}
            </h2>
            <h3 className="text-lg font-medium text-gray-700">Credits</h3>

            <Button
              className="w-full bg-violet-700 hover:bg-violet-800 text-white"
              onClick={() => setSelectedOption(item)}
            >
              Select
            </Button>

            <p className="text-sm text-gray-500 mt-2">₹{item.amount}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("payment cancel")}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption?.amount?.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BuyCredits;
