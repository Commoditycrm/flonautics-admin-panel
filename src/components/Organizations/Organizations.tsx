"use client";
import React, { useEffect, useState } from "react";
import { Col, Row, TablePaginationConfig } from "antd";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { GET_ORGANIZATIONS } from "@/src/gql";
import { displayDate } from "@/src/data/helpers/displayDate";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
const Organizations = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { getColumnSearchProps } = useColumnSearch();

  const { data, error, loading, fetchMore } = useQuery(GET_ORGANIZATIONS, {
    variables: {
      options: {
        limit: 10,
        offset: 0,
        sort: [
          {
            lastModified: "ASC",
          },
          {
            createdAt: "DESC",
          },
        ],
      },
    },
  });

  useEffect(() => {
    if (data && data?.organizations?.length) {
      setOrganizations(data.organizations);
      setTotalCount(data?.organizationsConnection.totalCount);
    }
  }, [data]);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (createdBy: { name: string }) => createdBy?.name,
      ...getColumnSearchProps("createdBy.name"),
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => displayDate(createdAt),
    },
    {
      title: "Last Updated",
      dataIndex: "lastModified",
      key: "lastModified",
      render: (lastModified: string) => lastModified ? displayDate(lastModified) : "-",
    },
    {
      title: "Users",
      dataIndex: "memberUsersConnection",
      key: "memberUsersConnection",
      render: (memberUsersConnection: { totalCount: number }) =>
        memberUsersConnection?.totalCount,
    },
    {
      title: "Projects",
      dataIndex: "projectsConnection",
      key: "projectsConnection",
      render: (projectsConnection: { totalCount: number }) =>
        projectsConnection?.totalCount,
    },
    {
      title: "Status",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: string) =>
        deletedAt === null ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-red-600">Inactive</span>
        ),
    },
  ];

  const handleTableChange = async (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10 } = pagination;
    const offset = (current - 1) * pageSize;

    setIsFetchingMore(true);
    try {
      await fetchMore({
        variables: {
          options: {
            limit: pageSize,
            offset,
            sort: [
              {
                lastModified: "DESC",
              },
              {
                createdAt: "DESC",
              },
            ],
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  };

  if (error) return <p>{error.message} </p>;

  return (
    <div>
      <Row>
        <Col span={24}>
          <CustomTable
            loading={loading || isFetchingMore}
            dataSource={organizations}
            columns={columns}
            rowKey={"id"}
            pageSize={10}
            totalCount={totalCount}
            onRowClick={(record) => router.push(`/organizations/${record.id}`)}
            onPageChange={handleTableChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Organizations;
