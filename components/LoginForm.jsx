"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        seterror("Invaild Login");
        return;
      }
      // console.log(res);
      router.replace("dashboard");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className=" shadow-2xl p-6 rounded-2xl">
      <h1 className=" mb-4 text-lg font-bold">Login</h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          className="input"
        />
        <button
          className=" bg-green-600 text-white py-1 my-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      {error && (
        <p className=" bg-red-500 w-fit rounded px-2 text-white text-sm my-1">
          {error}
        </p>
      )}
      <Link className="flex justify-end mt-3" href={"/register"}>
        <p className=" text-sm">
          Dont have an account?<span className="underline">Signup</span>
        </p>
      </Link>
    </div>
  );
};

export default LoginForm;
