import React from "react";

import OrganizationDetails from "@/src/components/Organizations/OrganizationDetails";

async function OrganizationDetailPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId } = await params;
  return (
    <div>
      <OrganizationDetails orgId={organizationId} />
    </div>
  );
}

export default OrganizationDetailPage;
