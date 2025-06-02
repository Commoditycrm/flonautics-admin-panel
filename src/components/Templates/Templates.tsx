"use client"
import React from "react"

import CustomTable from "@/src/hoc/CustomTable/CustomTable"

const Templates = () => {

  const dataSource = [
    {
      key: "1",
      name: "Flonautics Template",
      description: "This sprint focuses on login and registration modules.",
      createdBy: "Alice Johnson",
      createdAt: "2025-05-30",
      totalBacklogs: 12,
    },
    {
      key: "2",
      name: "Sample One",
      description: "Implement payment integration and cart functionality.",
      createdBy: "Bob Smith",
      createdAt: "2025-05-28",
      totalBacklogs: 8,
    },
  ]

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

  return (
    <div>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        rowKey={"key"}
        onRowClick={() => { }}
      />
    </div>
  )
}

export default Templates