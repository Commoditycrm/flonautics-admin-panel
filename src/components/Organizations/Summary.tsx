import React, { FC, useEffect, useState } from "react";
import { Col, Row, Space } from "antd";

import { AttacthmentStorageType, ISummary } from "@/src/data/types";
import { displayDate } from "@/src/data/helpers/displayDate";
import CustomButton from "@/src/hoc/CustomButton/CustomButton";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FIREBASE_STORAGE, TOGGLE_ORG_STATUS } from "@/src/gql";

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
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/notification/active`,
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

  const { data, loading: getFirebaseStorageLoading } = useQuery(
    GET_FIREBASE_STORAGE,
    {
      variables: {
        orgId: orgDetail[0]?.id,
      },
      skip: !orgDetail[0]?.id,
    }
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
                <span>{orgDetail[0]?.description}</span>
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
                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-2">
                  <h2 className="text-[15px]">{card.title}</h2>
                  <span className="text-gray-400 text-lg">
                    {card?.description}
                  </span>
                </div>
              </Col>
            ))}
            <Col key={orgDetail[0]?.id} span={5}>
              <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                {getFirebaseStorageLoading ? (
                  <React.Fragment>
                    <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-5 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h2 className="text-[15px]">Attatchment Storage</h2>
                    <span className="text-gray-400">
                      {attatchmentStorage?.totalMB} MB
                    </span>
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
