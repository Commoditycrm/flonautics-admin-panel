"use client";
import React, { useEffect, useState } from "react";
import { Col, Row, TablePaginationConfig } from "antd";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

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
import { DeleteOutlined } from "@ant-design/icons";
import ConfirmModal from "@/src/hoc/ConfirmModal";
const Organizations = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [org, setOrg] = useState<Organization | null>(null);

  const { getColumnSearchProps } = useColumnSearch();

  const { data, error, loading, fetchMore } = useQuery(GET_ORGANIZATIONS, {
    variables: {
      options: {
        limit: 10,
        offset: 0,
        sort: [
          {
            lastModified: SortDirection.Desc,
          },
          // {
          //   createdAt: "DESC",
          // },
        ],
      },
    },
  });

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
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (createdBy: User) => createdBy?.name,
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
      render: (lastModified: string) =>
        lastModified ? displayDate(lastModified) : "-",
    },
    {
      title: "Users",
      dataIndex: "memberUsersConnection",
      key: "memberUsersConnection",
      render: (memberUsersConnection: OrganizationMemberUsersConnection) =>
        memberUsersConnection?.totalCount,
    },
    {
      title: "Projects",
      dataIndex: "projectsConnection",
      key: "projectsConnection",
      render: (projectsConnection: OrganizationProjectsConnection) =>
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
    {
      title: "",
      dataIndex: "id",
      key: "deleteOrg",
      render: (_: string, record: Organization) => {
        return (
          <DeleteOutlined
            color="red"
            className="hover:text-red-400"
            style={{
              color: "red",
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (record?.id) {
                setOrg(record);
                setShowModal(true);
              }
            }}
          />
        );
      },
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
              // {
              //   createdAt: "DESC",
              // },
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            columns={columns}
            rowKey={"id"}
            pageSize={10}
            totalCount={totalCount}
            onRowClick={(record) => router.push(`/organizations/${record.id}`)}
            onPageChange={handleTableChange}
          />
        </Col>
      </Row>
      <ConfirmModal
        isOpen={showModal}
        description="Are you sure you want to delete this organization? This action is irreversible and will permanently remove all associated data."
        onClose={handleCloseModal}
        onOk={handleDeleteOrg}
        title="Delete Organization"
        loading={deleteOrgLoading}
      />
    </div>
  );
};

export default Organizations;
