"use client";
import React, { useEffect, useState } from "react";

import CustomTable from "@/src/hoc/CustomTable/CustomTable";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "@/src/gql";
import { Project, SortDirection } from "flonautics-project-types";

const Templates: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TEMPLATES, {
    variables: {
      where: {
        isTemplate: true,
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
        isTemplate: true,
      },
    },
  });

  const [templates, setTemplates] = useState<Project[]>([]);
  const [totalCount, setTotalCount] = useState<number>(10);

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Total Backlogs",
      dataIndex: "totalBacklogs",
      key: "totalBacklogs",
    },
  ];

  useEffect(() => {
    if (data && data.projects.length) {
      setTemplates(data.projects);
      setTotalCount(data?.projectsConnection.totalCount);
    }
  }, [data]);

  if (error) return <div> {error.message} </div>;

  return (
    <div>
      <CustomTable
        dataSource={templates}
        columns={columns}
        rowKey="id"
        loading={loading}
        onRowClick={() => {}}
        totalCount={totalCount}
      />
    </div>
  );
};

export default Templates;
