import React from "react";

import { Metadata } from "next";
import ProjectDetails from "@/src/components/Organizations/ProjectDetails";

export const metadata: Metadata = {
  title: "Project Detail",
};

type Props = {
  params: Promise<{ projectId: string }>;
};

async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  return <ProjectDetails projectId={projectId} />;
}

export default ProjectDetailPage;
