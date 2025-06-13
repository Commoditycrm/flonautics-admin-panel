import React, { FC } from "react";
import { Col, Row, Space } from "antd";

import { ISummary } from "@/src/data/types";
import { displayDate } from "@/src/data/helpers/displayDate";
import CustomButton from "@/src/hoc/CustomButton/CustomButton";
import { useMutation } from "@apollo/client";
import { TOGGLE_ORG_STATUS } from "@/src/gql";

const Summary: FC<ISummary> = ({ orgDetail, cards }) => {
  const [toggleOrgStatus, { loading }] = useMutation(TOGGLE_ORG_STATUS, {
    onError(error) {
      console.error(error);
    },
    async onCompleted({ updateOrganizations: { organizations } }) {
      try {
        if (organizations[0]?.deletedAt) {
          const response = await fetch(
            "https://react-auth-flow.vercel.app/api/organizations/deactivate",
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
            }
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

  return (
    <div>
      <Row gutter={[0, 25]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col span={20}>
              <Space direction="vertical" size={5}>
                <span className="text-[17px] font-semibold">
                  {orgDetail[0]?.name}{" "}
                </span>
                <span>
                  {orgDetail[0]?.description}
                </span>
                <span className="text-gray-400">
                  Created By {orgDetail[0]?.createdBy?.name} On{" "}
                  {displayDate(orgDetail[0]?.createdAt)}
                </span>
              </Space>
            </Col>

            <Col span={2}>
              <Space>
                <CustomButton
                  value={
                    orgDetail[0]?.deletedAt === null ? "Deactivate" : "Activate"
                  }
                  type={"primary"}
                  onClick={handleUpdateOrgStatus}
                  color={orgDetail[0]?.deletedAt === null ? "red" : ""}
                  disabled={loading}
                  loading={loading}
                />
              </Space>
            </Col>
          </Row>
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

export default Summary;
