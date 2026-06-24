"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";

import { GET_ORGANIZATION_BY_ID } from "@/src/gql";
import Summary from "./Summary";
import OrganizationUsers from "./OrganizationUsers";
import OrganizationProjects from "./OrganizationProjects";
import { Organization } from "flonautics-project-types";
import { formatSize } from "@/src/data/helpers/formatSize";
import { displayDate } from "@/src/data/helpers/displayDate";
import StatusTag from "@/src/components/ui/StatusTag";
import ErrorState from "@/src/components/ui/ErrorState";

const HeaderSkeleton = () => (
  <div className="mb-6 flex items-center gap-4">
    <div className="h-12 w-12 animate-pulse rounded-xl bg-[#ececef]" />
    <div className="space-y-2">
      <div className="h-5 w-48 animate-pulse rounded bg-[#ececef]" />
      <div className="h-3 w-64 animate-pulse rounded bg-[#f1f1f4]" />
    </div>
  </div>
);

const OrganizationDetails: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [orgDetail, setOrgDetail] = useState<Organization[]>([]);
  const [cards, setCards] = useState<
    Array<{ title: string; description: number | string }>
  >([]);

  const { data, error, refetch } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: {
      where: {
        id: orgId,
      },
    },
    skip: !orgId,
  });

  useEffect(() => {
    if (data && data.organizations.length) {
      setOrgDetail(data?.organizations);
      const cardsData = [
        {
          title: "Total Users",
          description:
            data?.organizations[0]?.memberUsersConnection?.totalCount,
        },
        {
          title: "Total Projects",
          description: data?.organizations[0]?.projectsConnection?.totalCount,
        },
        {
          title: "Total Storage Used",
          description: formatSize(data?.organizations[0]?.estimatedSize),
        },
      ];
      setCards(cardsData);
    }
  }, [data]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Summary",
      children: <Summary cards={cards} orgDetail={orgDetail} />,
    },
    {
      key: "2",
      label: "Users",
      children: <OrganizationUsers orgId={orgId} />,
    },
    {
      key: "3",
      label: "Projects",
      children: <OrganizationProjects orgId={orgId} />,
    },
  ];

  if (error)
    return <ErrorState message={error.message} onRetry={() => refetch()} />;

  const org = orgDetail[0];
  const ready = !!org;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!ready ? (
        <>
          <HeaderSkeleton />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[108px] animate-pulse rounded-[var(--radius-card)] border border-border bg-[#f4f4f6]"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg font-semibold text-brand">
              {(org?.name || "?").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-[22px] font-semibold tracking-tight text-ink">
                  {org?.name}
                </h1>
                <StatusTag active={org?.deletedAt === null} />
              </div>
              {org?.description && (
                <p className="mt-1 text-sm text-ink-soft">{org.description}</p>
              )}
              <p className="mt-0.5 text-xs text-muted">
                Created by {org?.createdBy?.name} · {displayDate(org?.createdAt)}
              </p>
            </div>
          </div>

          <Tabs defaultActiveKey="1" items={items} />
        </>
      )}
    </motion.div>
  );
};

export default OrganizationDetails;
