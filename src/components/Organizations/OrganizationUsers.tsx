import React, { useEffect, useState } from "react";
import { Space, TablePaginationConfig, Typography } from "antd";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import AlphabetAvatar from "@/src/hoc/CustomAvatar/AlphabetAvatar";
import { useQuery } from "@apollo/client";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import { GET_MEMBERS_IN_ORG } from "@/src/gql";
import { SortDirection, User } from "flonautics-project-types";

const { Text } = Typography;

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
        <Space size={5}>
          <AlphabetAvatar name={name} size={34} />
          <Text className="text-md">{name}</Text>
        </Space>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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

export default OrganizationUsers;
