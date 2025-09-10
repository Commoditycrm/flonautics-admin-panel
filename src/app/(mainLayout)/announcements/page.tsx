import React from "react";
import { Metadata } from "next";

import Announcements from "@/src/components/Announcements/Announcements";

export const metadata: Metadata = {
    title: "Announcements",
};

const AnnouncementsPage = () => {
    return <Announcements/>;
};

export default AnnouncementsPage;
