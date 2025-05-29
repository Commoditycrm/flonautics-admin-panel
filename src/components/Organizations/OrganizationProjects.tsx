import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { displayDate } from "@/src/data/helpers/displayDate";
import { TablePaginationConfig } from "antd";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import { GET_PROJECTS_BY_ORG } from "@/src/gql";

const OrganizationProjects: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [dataSource, setDataDource] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const router = useRouter();

  const { getColumnSearchProps } = useColumnSearch();

  const { data, loading, fetchMore } = useQuery(GET_PROJECTS_BY_ORG, {
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
    skip: !orgId,
    notifyOnNetworkStatusChange: true,
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
      render: (description: string) =>
        description?.length > 30
          ? `${description.slice(0, 30)}...`
          : description || "-",
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        onRowClick={(record) =>
          router.push(`/organizations/${orgId}/projects/${record.id}`)
        }
        loading={loading}
        totalCount={totalCount}
        onPageChange={handleTableChange}
      />
    </div>
  );
};

export default OrganizationProjects;
