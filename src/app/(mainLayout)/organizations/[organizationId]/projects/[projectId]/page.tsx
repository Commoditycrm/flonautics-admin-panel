import React from "react";

import { Metadata } from "next";
import ProjectDetails from "@/src/components/Organizations/ProjectDetails";

export const metadata: Metadata = {
  title: "Project Detail",
};

async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;
  return <ProjectDetails projectId={projectId} />;
}

export default ProjectDetailPage;
