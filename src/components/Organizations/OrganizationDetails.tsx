/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Space } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION_BY_ID } from "@/src/gql";
import { displayDate } from "@/src/data/helpers/displayDate";
const OrganizationDetails: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [orgDetail, setOrgDetail] = useState([]);
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

  if (error) return <p> {error.message} </p>;

  if (loading) return <p> ..Loading </p>;

  return (
    <div>
      <Row gutter={[0, 25]}>
        <Col span={24}>
          <Space direction="vertical" size={0}>
            <span className="text-lg">
              {
                // @ts-ignore
                orgDetail[0]?.name
              }{" "}
            </span>
            <span className="text-gray-400">
              Created By{" "}
              {
                // @ts-ignore
                orgDetail[0]?.createdBy?.name
              }{" "}
              On{" "}
              {
                // @ts-ignore
                displayDate(orgDetail[0]?.createdAt)
              }
            </span>
          </Space>
        </Col>

        <Col span={24}>
          <Row gutter={20}>
            {cards?.map((card, index) => (
              <Col key={index} span={5}>
                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                  <h2 className="text-[15px]">{card.title}</h2>
                  <span className="text-gray-400">{card?.description}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizationDetails;
