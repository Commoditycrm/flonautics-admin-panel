import React, { FC, useEffect, useState } from "react";
import { Button } from "antd";
import {
  TeamOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

import { AttacthmentStorageType, ISummary } from "@/src/data/types";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FIREBASE_STORAGE, TOGGLE_ORG_STATUS } from "@/src/gql";
import StatusTag from "@/src/components/ui/StatusTag";
import StatCard from "@/src/components/ui/StatCard";

const iconFor = (title: string) => {
  if (title.includes("User")) return <TeamOutlined />;
  if (title.includes("Project")) return <ProjectOutlined />;
  return <DatabaseOutlined />;
};

const Summary: FC<ISummary> = ({ orgDetail, cards }) => {
  const [attatchmentStorage, setAttatchmentStorage] =
    useState<AttacthmentStorageType | null>(null);
  const [toggleOrgStatus, { loading }] = useMutation(TOGGLE_ORG_STATUS, {
    onError(error) {
      console.error(error);
    },
    async onCompleted({ updateOrganizations: { organizations } }) {
      try {
        if (organizations[0]?.deletedAt) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/organization/notification/deactivate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: orgDetail[0]?.createdBy?.email,
                userName: orgDetail[0]?.createdBy?.name,
                orgName: orgDetail[0]?.name,
              }),
            },
          );
          if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notification/organization/active`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: orgDetail[0]?.createdBy?.email,
                userName: orgDetail[0]?.createdBy?.name,
                orgName: orgDetail[0]?.name,
              }),
            },
          );
          if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { data, loading: getFirebaseStorageLoading } = useQuery(
    GET_FIREBASE_STORAGE,
    {
      variables: {
        orgId: orgDetail[0]?.id,
      },
      skip: !orgDetail[0]?.id,
    },
  );

  const handleUpdateOrgStatus = async () => {
    try {
      await toggleOrgStatus({
        variables: {
          where: {
            id: orgDetail[0].id,
          },
          update: {
            deletedAt: orgDetail[0]?.deletedAt === null ? new Date() : null,
          },
        },
        update(cache) {
          cache.modify({
            id: cache.identify({
              id: orgDetail[0].id,
              __typename: "Organization",
            }),
            fields: {
              deletedAt() {
                return orgDetail[0]?.deletedAt === null ? new Date() : null;
              },
            },
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setAttatchmentStorage(data?.getFirebaseStorage);
    }
  }, [data]);

  const isActive = orgDetail[0]?.deletedAt === null;

  return (
    <div className="space-y-5">
      {/* Status control */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-ink">
            Organization status
          </span>
          <StatusTag active={isActive} />
        </div>
        <Button
          type="primary"
          danger={isActive}
          onClick={handleUpdateOrgStatus}
          disabled={loading}
          loading={loading}
        >
          {isActive ? "Deactivate organization" : "Activate organization"}
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards?.map((card, index) => (
          <StatCard
            key={card.title}
            label={card.title}
            value={card.description}
            icon={iconFor(card.title)}
            index={index}
          />
        ))}
        <StatCard
          label="Attachment Storage"
          value={`${attatchmentStorage?.totalMB ?? 0} MB`}
          icon={<PaperClipOutlined />}
          loading={getFirebaseStorageLoading}
          index={cards?.length ?? 3}
        />
      </div>
    </div>
  );
};

export default Summary;
