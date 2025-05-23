import React from "react";

import Organizations from "@/src/components/Organizations/Organizations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization",
};

const OrganizationsPage = () => {
  return <Organizations />;
};

export default OrganizationsPage;
