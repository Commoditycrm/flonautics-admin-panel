"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATIONS } from "@/src/gql";
const Organizations = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState([]);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created By",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created On",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Users",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Total Projects",
      dataIndex: "address",
      key: "address",
    },
  ];

  const { data, error, loading } = useQuery(GET_ORGANIZATIONS, {
    variables: {
      options: {
        limit: 10,
        offset: 0,
        sort: [
          {
            createdAt: "DESC",
          },
        ],
      },
    },
  });

  useEffect(() => {
    if (data && data?.organizations?.length) {
      console.log(data);
      setOrganizations(data.organizations);
    }
  }, [data]);

  if (error) return <p>{error.message} </p>;
  return (
    <div>
      <Row>
        <Col span={24}>
          <CustomTable
            loading={loading}
            dataSource={organizations}
            columns={columns}
            rowKey={"key"}
            onRowClick={(record) => router.push(`/organizations/${record.id}`)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Organizations;
