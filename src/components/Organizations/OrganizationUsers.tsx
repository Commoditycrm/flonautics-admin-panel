import React, { useEffect, useState } from "react";
import { Space, TablePaginationConfig, Typography } from "antd";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import AlphabetAvatar from "@/src/hoc/CustomAvatar/AlphabetAvatar";
import { useQuery } from "@apollo/client";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import { GET_MEMBERS_IN_ORG } from "@/src/gql";
import { SortDirection, User } from "flonautics-project-types";
import Surface from "@/src/components/ui/Surface";
import EmptyState from "@/src/components/ui/EmptyState";
import TableSkeleton from "@/src/components/ui/TableSkeleton";

const { Text } = Typography;

const RoleTag = ({ role }: { role?: string }) => {
  if (!role) return <span className="text-muted">—</span>;
  const strong = /admin|owner/i.test(role);
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${
        strong ? "bg-brand-soft text-brand" : "bg-[#f4f4f5] text-ink-soft"
      }`}
    >
      {role.toLowerCase()}
    </span>
  );
};

const OrganizationUsers: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [dataSource, setDataDource] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { getColumnSearchProps } = useColumnSearch();

  const { data, loading, fetchMore } = useQuery(GET_MEMBERS_IN_ORG, {
    variables: {
      where: {
        memberOfOrganizations_SOME: {
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
      usersConnectionWhere2: {
        memberOfOrganizations_SOME: {
          id: orgId,
        },
      },
    },
    skip: !orgId,
  });

  useEffect(() => {
    if (data && data?.users) {
      setDataDource(data?.users);
      setTotalCount(data?.usersConnection?.totalCount);
    }
  }, [data]);

  // table columns
  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space size={10}>
          <AlphabetAvatar name={name} size={34} />
          <Text className="font-medium !text-ink">{name}</Text>
        </Space>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-ink-soft">{email}</span>,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <RoleTag role={role} />,
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
            sort: [{ createdAt: SortDirection.Desc }],
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

  const showSkeleton = loading && dataSource.length === 0;
  const showEmpty = !loading && dataSource.length === 0;

  return (
    <Surface>
      {showSkeleton ? (
        <TableSkeleton cols={3} />
      ) : showEmpty ? (
        <EmptyState
          title="No members yet"
          description="Users who join this organization will appear here."
        />
      ) : (
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          rowKey={"id"}
          onRowClick={() => {}}
          loading={loading || isFetchingMore}
          totalCount={totalCount}
          onPageChange={handleTableChange}
        />
      )}
    </Surface>
  );
};

export default OrganizationUsers;
