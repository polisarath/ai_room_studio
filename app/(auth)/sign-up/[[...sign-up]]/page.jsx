import { SignIn, SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/5.jpg')` }} // Image should be in /public folder
    >
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
