"use client";
import React, { useEffect, useState } from "react";
import { TablePaginationConfig, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { DeleteOutlined } from "@ant-design/icons";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { DELETE_ORG, GET_ORGANIZATIONS } from "@/src/gql";
import { displayDate } from "@/src/data/helpers/displayDate";
import { useColumnSearch } from "@/src/data/helpers/getColumnSearch";
import {
  Organization,
  OrganizationMemberUsersConnection,
  OrganizationProjectsConnection,
  SortDirection,
  User,
} from "flonautics-project-types";
import ConfirmModal from "@/src/hoc/ConfirmModal";
import PageHeader from "@/src/components/ui/PageHeader";
import Surface from "@/src/components/ui/Surface";
import StatusTag from "@/src/components/ui/StatusTag";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import TableSkeleton from "@/src/components/ui/TableSkeleton";

const CountChip = ({ value }: { value: number }) => (
  <span className="inline-flex min-w-[28px] justify-center rounded-md bg-[#f4f4f5] px-2 py-0.5 text-xs font-medium text-ink-soft">
    {value ?? 0}
  </span>
);

const Organizations = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [org, setOrg] = useState<Organization | null>(null);

  const { getColumnSearchProps } = useColumnSearch();

  const { data, error, loading, fetchMore, refetch } = useQuery(
    GET_ORGANIZATIONS,
    {
      variables: {
        options: {
          limit: 10,
          offset: 0,
          sort: [{ lastModified: SortDirection.Desc }],
        },
      },
    }
  );

  const [deleteOrg, { loading: deleteOrgLoading }] = useMutation(DELETE_ORG, {
    async onCompleted() {
      setOrg(null);
      setShowModal(false);
      try {
        const response = await fetch(
          "https://react-auth-flow.vercel.app/api/organizations/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: org?.createdBy.email,
              userName: org?.createdBy.name,
              orgName: org?.name,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData);
        }
      } catch (error) {
        console.error("Error while removing user:", error);
        alert(`Error: ${error}`);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleDeleteOrg = async () => {
    try {
      await deleteOrg({
        variables: {
          orgId: org?.id,
        },
        update(cache) {
          cache.evict({
            id: cache.identify({
              id: org?.id,
              __typename: "Organization",
            }),
          });
          cache.gc();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setOrg(null);
    setShowModal(false);
  };

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
      render: (name: string) => (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-semibold text-brand">
            {(name || "?").charAt(0).toUpperCase()}
          </span>
          <span className="font-medium text-ink">{name}</span>
        </div>
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
      title: "Last Updated",
      dataIndex: "lastModified",
      key: "lastModified",
      render: (lastModified: string) => (
        <span className="text-ink-soft">
          {lastModified ? displayDate(lastModified) : "-"}
        </span>
      ),
    },
    {
      title: "Users",
      dataIndex: "memberUsersConnection",
      key: "memberUsersConnection",
      render: (memberUsersConnection: OrganizationMemberUsersConnection) => (
        <CountChip value={memberUsersConnection?.totalCount} />
      ),
    },
    {
      title: "Projects",
      dataIndex: "projectsConnection",
      key: "projectsConnection",
      render: (projectsConnection: OrganizationProjectsConnection) => (
        <CountChip value={projectsConnection?.totalCount} />
      ),
    },
    {
      title: "Status",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: string) => <StatusTag active={deletedAt === null} />,
    },
    {
      title: "",
      dataIndex: "id",
      key: "deleteOrg",
      width: 56,
      render: (_: string, record: Organization) => (
        <Tooltip title="Delete organization">
          <button
            aria-label="Delete organization"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-[#fdeceb] hover:text-[#e5484d]"
            onClick={(event) => {
              event.stopPropagation();
              if (record?.id) {
                setOrg(record);
                setShowModal(true);
              }
            }}
          >
            <DeleteOutlined />
          </button>
        </Tooltip>
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
            sort: [{ lastModified: "DESC" }],
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

  const showSkeleton = loading && organizations.length === 0;
  const showEmpty = !loading && !error && organizations.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Organizations"
        description="Manage every workspace, its members, and projects."
        badge={
          totalCount > 0 ? (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">
              {totalCount}
            </span>
          ) : null
        }
      />

      <Surface>
        {error ? (
          <ErrorState message={error.message} onRetry={() => refetch()} />
        ) : showSkeleton ? (
          <TableSkeleton cols={7} />
        ) : showEmpty ? (
          <EmptyState
            title="No organizations yet"
            description="Organizations created by your users will appear here."
          />
        ) : (
          <CustomTable
            loading={loading || isFetchingMore}
            dataSource={organizations}
            // @ts-expect-error column render types are wider than AnyObject
            columns={columns}
            rowKey={"id"}
            pageSize={10}
            totalCount={totalCount}
            onRowClick={(record) => router.push(`/organizations/${record.id}`)}
            onPageChange={handleTableChange}
          />
        )}
      </Surface>

      <ConfirmModal
        isOpen={showModal}
        description="Are you sure you want to delete this organization? This action is irreversible and will permanently remove all associated data."
        onClose={handleCloseModal}
        onOk={handleDeleteOrg}
        title="Delete Organization"
        loading={deleteOrgLoading}
      />
    </motion.div>
  );
};

export default Organizations;
