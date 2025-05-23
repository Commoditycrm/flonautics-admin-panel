import React from "react";

import OrganizationDetails from "@/src/components/Organizations/OrganizationDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization Detail",
};

type Props = {
  params: Promise<{ organizationId: string }>;
};

async function OrganizationDetailPage({ params }: Props) {
  const { organizationId } = await params;
  return (
    <React.Fragment>
      <OrganizationDetails orgId={organizationId} />
    </React.Fragment>
  );
}

export default OrganizationDetailPage;
