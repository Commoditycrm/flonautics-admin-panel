"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { useQuery } from "@apollo/client";

import { GET_ORGANIZATION_BY_ID } from "@/src/gql";
import Summary from "./Summary";
import OrganizationUsers from "./OrganizationUsers";
import OrganizationProjects from "./OrganizationProjects";
import { Organization } from "flonautics-project-types";
const OrganizationDetails: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [orgDetail, setOrgDetail] = useState<Organization[]>([]);
  const [cards, setCards] = useState<
    Array<{ title: string; description: number }>
  >([]);

  const { data, loading, error } = useQuery(GET_ORGANIZATION_BY_ID, {
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

  if (error) return <p> {error.message} </p>;

  if (loading) return <p> ..Loading </p>;

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default OrganizationDetails;
