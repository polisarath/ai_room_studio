
// "use client";

// import { SignIn } from "@clerk/nextjs";
// import { useSearchParams } from "next/navigation";

// export default function Page() {
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect_url") || "/dashboard"; // fallback to /dashboard

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <SignIn redirectUrl={redirectUrl} />
//     </div>
//   );
// }


"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const fallbackRedirectUrl = searchParams.get("redirect_url") || "/dashboard"; // Use fallbackRedirectUrl instead of redirectUrl

  return (

     <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/7.jpg')` }} // Image should be in /public folder
    >
 <div className="flex justify-center items-center h-screen">
      <SignIn fallbackRedirectUrl={fallbackRedirectUrl} /> {/* Use the new prop */}
      {/* <SignIn fallbackRedirectUrl="/dashboard" /> */}
    </div>
    </div>
   
  );
}
