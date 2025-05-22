import React, { Suspense } from "react";

import Login from "../components/Login";

const page = () => {
  return (
    <Suspense fallback={<p>..Loading</p>}>
      <Login />
    </Suspense>
  );
};

export default page;
