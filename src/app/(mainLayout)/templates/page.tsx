import React from "react";
import { Metadata } from "next";
import Templates from "@/src/components/Templates/Templates";

export const metadata: Metadata = {
    title: "Templates",
};

const TemplatesPage = () => {
    return <Templates />;
};

export default TemplatesPage;
