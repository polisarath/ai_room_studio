// "use client";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect } from "react";
// function Provider  ({ children }) {
//     const {user}=useUser();
// useEffect(()=>{
//     user&&VerifyUser();
// },[user])
//     const VerifyUser=(){

//     }
//   return;
//   <div>{children}</div>;
// };

// export default Provider;

// "use client";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";

// import React, { useEffect } from "react";

// function Provider({ children }) {
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       VerifyUser();
//     }
//   }, [user]);

//   const VerifyUser = () => {
// const dataResult=await axios.post('/app/api/verify-user')
// user:user
//     console.log("Verifying user:", user);
//   };

//   return <div>{children}</div>;
// }

// export default Provider;

"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailsContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    if (user) {
      VerifyUser();
    }
  }, [user]);

  const VerifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user,
      });
      setUserDetail(dataResult.data.result);
    } catch (err) {
      console.error("Error verifying user:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <div>{children}</div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
