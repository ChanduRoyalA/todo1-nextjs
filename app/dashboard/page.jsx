"use client";

import Nav from "@/components/Nav";
import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userDetails, setuserDetails] = useState()
  const { data: session } = useSession();
  const user = async () => {
    const res = await fetch("/api/userExists", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
      })
    });
    const d = await res.json()
    setuserDetails(d.userDetails)
  };
  useEffect(() => {
    user();
  }, []);
  if (userDetails) {
    return (
      <div className="h-screen">
        <Nav details={userDetails} />
        <UserInfo details={userDetails} />
      </div>
    )
  }
  else {
    user()
    return <h1>Loding</h1>
  }
};

export default Dashboard;
