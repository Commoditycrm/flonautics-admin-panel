import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { displayDate } from "@/src/data/helpers/displayDate";
import { TablePaginationConfig } from "antd";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import { GET_PROJECTS_IN_ORGANIZATION } from "@/src/gql";

const OrganizationProjects = () => {
  const [dataSource, setDataDource] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const params = useParams();
  const orgId = params?.organizationId;

  const { getColumnSearchProps } = useColumnSearch();

  const { data, loading, fetchMore } = useQuery(GET_PROJECTS_IN_ORGANIZATION, {
    variables: {
      where: {
        organization: {
          id: orgId,
        },
      },
      options: {
        limit: 10,
        offset: 0,
        sort: [
          {
            createdAt: "DESC",
          },
        ],
      },
      projectsConnectionWhere2: {
        organization: {
          id: orgId,
        },
      },
    },
  });

  useEffect(() => {
    if (data?.projects.length) {
      setDataDource(data?.projects);
      setTotalCount(data?.projectsConnection?.totalCount);
    }
  }, [data]);

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => description || "-",
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
      title: "Total Users",
      dataIndex: "assignedUsersConnection",
      key: "assignedUsersConnection",
      render: (assignedUsersConnection: { totalCount: number }) =>
        assignedUsersConnection?.totalCount,
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
            sort: [{ createdAt: "DESC" }],
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

  return (
    <div>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onRowClick={() => {}}
        loading={loading || isFetchingMore}
        totalCount={totalCount}
        onPageChange={handleTableChange}
      />
    </div>
  );
};

export default OrganizationProjects;
