"use client";
import { signOut } from "next-auth/react";

const Nav = ({ details }) => {
  return (
    <nav className=" bg-black h-fit w-full text-white px-6 py-4 flex justify-between items-baseline">
      <p>Logo</p>
      <>
        <div className="group px-2 py-1 NavLogBtn md:hidden hover:bg-white border-2 border-black hover:border-white hover:rounded hover:text-black">
          Profile
          <div className="absolute top-12 right-6 hidden xsm:group-hover:flex bg-transparent ">
            <div className="bg-green-100 h-fit mt-6 rounded-md px-3 py-2 flex flex-col gap-2 place-items-start">
              <div className="h-fit w-full px-1 py-2">
                <h1 className="text-[10px] mb-1 font-bold">Signed in as:</h1>
                <h1 className="text-sm">{details.email}</h1>
              </div>
              <button
                className="  bg-red-500 text-white font-bold px-4 py-1 rounded-md"
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
        <button
          className="hidden md:flex bg-red-500 text-white font-bold px-4 py-1 rounded-md"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </>
    </nav >
  );
};

export default Nav;
