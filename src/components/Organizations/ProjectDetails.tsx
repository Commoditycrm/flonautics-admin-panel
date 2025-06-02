"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, TablePaginationConfig, Tag, Badge, Typography } from "antd";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ITEM_COUNT_BY_STATUS, GET_BACKLOGITEMS_BY_PROJECT } from "@/src/gql";
import { BacklogItem } from "flonautics-project-types";
import { AnyObject } from "antd/es/_util/type";
import { riskLevelHandler } from "@/src/data/helpers/riskLevelHandler";

const statuses = ["Not started", "Completed", "Blocked", "In progress", "Hold"];

const { Text } = Typography

const ProjectDetails: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [backlogList, setBacklogList] = useState<BacklogItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [counts, setCounts] = useState<AnyObject>({});

  const { data, loading, error, fetchMore } = useQuery(
    GET_BACKLOGITEMS_BY_PROJECT,
    {
      variables: {
        where: {
          project: {
            id: projectId,
          },
        },
        options: {
          limit: 10,
          offset: 0,
          sort: [
            {
              uid: "DESC",
            },
          ],
        },
        backlogItemsConnectionWhere2: {
          project: {
            id: projectId,
          },
        },
      },
      skip: !projectId,
      notifyOnNetworkStatusChange: true,
    }
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [getItemCountByStatus, { loading: getItemCountLoading, data: getItemCountByStatusData }] = useLazyQuery(GET_ITEM_COUNT_BY_STATUS);

  // table columns
  const columns = [
    {
      title: "#",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: { name: string }) => type?.name
    },
    {
      title: "Assigned User",
      dataIndex: "assignedUser",
      key: "assignedUser",
      render: (assignedUser: { name: string }) => assignedUser?.name || "-"
    },
    {
      title: "Title",
      dataIndex: "label",
      key: "label",
      render: (label: string) =>
        label?.length > 30
          ? `${label.slice(0, 30)}...`
          : label || "-",
    },
    {
      title: "Risk Level",
      dataIndex: "riskLevel",
      key: "riskLevel",
      render: (riskLevel: string) => {
        const { color, text } = riskLevelHandler(riskLevel);
        return (
          <Badge
            status={color}
            text={
              text ? (
                <Text className="text-md">{text}</Text>
              ) : (
                <Text type="secondary">_</Text>
              )
            }
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: { name: string, color: string }) => <Tag color={status?.color}>{status.name} </Tag >

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
            sort: [
              {
                uid: "DESC",
              },
            ],
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

  useEffect(() => {
    if (data && data?.backlogItems.length) {
      setBacklogList(data.backlogItems);
      setTotalCount(data.backlogItemsConnection?.totalCount);
    }
  }, [data]);

  useEffect(() => {
    if (currentIndex < statuses.length) {
      getItemCountByStatus({
        variables: {
          where: {
            project: {
              id: projectId,
            },
            status: {
              name_CONTAINS: statuses[currentIndex],
            },
          },
        },
      });
    }
  }, [currentIndex, getItemCountByStatus, projectId]);

  useEffect(() => {
    if (getItemCountByStatusData) {
      const status = statuses[currentIndex];
      setCounts((prev) => ({
        ...prev,
        [status]: getItemCountByStatusData.backlogItemsConnection.totalCount,
      }));
      setCurrentIndex((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItemCountByStatusData]);

  if (error) return <div> {error?.message}</div>;

  return (
    <div>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <span className="text-lg">Backlogs</span>
        </Col>

        {/* <Col span={24}>
          <Row gutter={15}>
            {Object.keys(counts)?.map((card, index) => (
              <Col key={index} span={4}>
                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                  <h2 className="text-[15px]">{card}</h2>
                  <span className="text-gray-400">{counts[card]}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col> */}

        <Col span={24}>
          <Row gutter={15}>
            {(getItemCountLoading || Object.keys(counts).length < 5 ? Array.from({ length: 5 }) : Object.keys(counts)
            ).map((_, index) => {
              const key = Object.keys(counts)[index];
              const isSkeleton = loading || index >= Object.keys(counts).length;

              return (
                <Col key={index} span={4}>
                  <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                    {isSkeleton ? (
                      <>
                        <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        <div className="h-5 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-[15px]">{key}</h2>
                        <span className="text-gray-400">{counts[key]}</span>
                      </>
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col span={24}>
          <CustomTable
            dataSource={backlogList}
            columns={columns}
            rowKey={"id"}
            onRowClick={() => { }}
            loading={loading}
            totalCount={totalCount}
            onPageChange={handleTableChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
