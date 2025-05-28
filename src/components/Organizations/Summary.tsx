/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  });

  const handleDeactivate = async () => {
    try {
      await toggleOrgStatus({
        variables: {
          where: {
            // @ts-ignore
            id: orgDetail[0].id,
          },
          update: {
            deletedAt: new Date(),
          },
        },
        update(cache) {
          cache.modify({
            id: cache.identify({
              // @ts-ignore
              id: orgDetail[0].id,
              __typename: "Organization",
            }),
            fields: {
              deletedAt() {
                return new Date();
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
            <Col>
              <Space direction="vertical" size={0}>
                <span className="text-[17px]">
                  {
                    // @ts-ignore
                    orgDetail[0]?.name
                  }{" "}
                </span>
                <span className="text-sm text-gray-400">
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

            <Col>
              <Space>
                <CustomButton
                  value={"Deactivate"}
                  type={"primary"}
                  onClick={handleDeactivate}
                  color="#ea354a"
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
