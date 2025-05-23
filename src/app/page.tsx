import React, { Suspense } from "react";
import Login from "../components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Please Login..",
};

const page = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default page;
