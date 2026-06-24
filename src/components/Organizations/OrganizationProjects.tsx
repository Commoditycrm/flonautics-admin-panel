import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { displayDate } from "@/src/data/helpers/displayDate";
import { TablePaginationConfig } from "antd";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import { GET_PROJECTS_BY_ORG } from "@/src/gql";
import {
  Project,
  ProjectAssignedUsersConnection,
  SortDirection,
  User,
} from "flonautics-project-types";
import Surface from "@/src/components/ui/Surface";
import EmptyState from "@/src/components/ui/EmptyState";
import TableSkeleton from "@/src/components/ui/TableSkeleton";

const CountChip = ({ value }: { value: number }) => (
  <span className="inline-flex min-w-[28px] justify-center rounded-md bg-[#f4f4f5] px-2 py-0.5 text-xs font-medium text-ink-soft">
    {value ?? 0}
  </span>
);

const OrganizationProjects: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [dataSource, setDataDource] = useState<Project[]>([]);
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
            createdAt: SortDirection.Desc,
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
      render: (name: string) => (
        <span className="font-medium text-ink">{name}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <span className="text-ink-soft">
          {description?.length > 40
            ? `${description.slice(0, 40)}...`
            : description || "-"}
        </span>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (createdBy: User) => (
        <span className="text-ink-soft">{createdBy?.name}</span>
      ),
      ...getColumnSearchProps("createdBy.name"),
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span className="text-ink-soft">{displayDate(createdAt)}</span>
      ),
    },
    {
      title: "Total Users",
      dataIndex: "assignedUsersConnection",
      key: "assignedUsersConnection",
      render: (record: ProjectAssignedUsersConnection) => (
        <CountChip value={record?.totalCount} />
      ),
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
            sort: [{ createdAt: SortDirection.Desc }],
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

  const showSkeleton = loading && dataSource.length === 0;
  const showEmpty = !loading && dataSource.length === 0;

  return (
    <Surface>
      {showSkeleton ? (
        <TableSkeleton cols={5} />
      ) : showEmpty ? (
        <EmptyState
          title="No projects yet"
          description="Projects created in this organization will show up here."
        />
      ) : (
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
      )}
    </Surface>
  );
};

export default OrganizationProjects;
