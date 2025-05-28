"use client"
import React from "react"
import { Row, Col } from "antd"

import CustomTable from "@/src/hoc/CustomTable/CustomTable"

const ProjectDetails = () => {

    const cards = [
        { title: "Not Started", description: "12" },
        { title: "Completed", description: "65" },
        { title: "Pending", description: "33" },
        { title: "Hold", description: "2" },
        { title: "Blocked", description: "12" },
    ]

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
        },
        {
            title: "Assigned User",
            dataIndex: "assignedUser",
            key: "assignedUser",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Risk Level",
            dataIndex: "riskLevel",
            key: "riskLevel",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        },
    ]

    const dataSource = [
        {
          key: "1",
          uid: "T-001",
          type: "Bug",
          assignedUser: "Alice Johnson",
          title: "Fix login issue",
          riskLevel: "High",
          status: "Open",
        },
        {
          key: "2",
          uid: "T-002",
          type: "Feature",
          assignedUser: "Bob Smith",
          title: "Add password reset",
          riskLevel: "Medium",
          status: "In Progress",
        },
    ]

    return (
        <div>
            <Row gutter={[0, 20]}>
                <Col span={24}>
                    <span className="text-lg">Backlogs</span>
                </Col>

                <Col span={24}>
                    <Row gutter={15}>
                        {cards?.map((card, index) => (
                            <Col key={index} span={4}>
                                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                                    <h2 className="text-[15px]">{card.title}</h2>
                                    <span className="text-gray-400">{card?.description}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col span={24}>
                    <CustomTable
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={"uid"}
                        onRowClick={() => { }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProjectDetails