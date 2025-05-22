"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATION_BY_ID } from "@/src/gql";

const OrganizationDetails: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [orgDetail, setOrgDetail] = useState([]);
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
    }
  }, [data]);

  if (error) return <p> {error.message} </p>;

  if (loading) return <p> ..Loading </p>;

  return (
    <div>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <h1 className="text-lg"> {orgDetail[0]?.name} </h1>
        </Col>

        <Col span={24}>
          <Row gutter={20}>
            {orgDetail?.map((org, index) => (
              <Col key={index} span={5}>
                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                  <h2 className="text-[15px]">{org.name}</h2>
                  <span className="text-gray-500">
                    {org?.description || "No Description"}
                  </span>
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
