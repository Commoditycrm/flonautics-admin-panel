"use client"
import React, { useState } from 'react'
import { Card, Col, Row, Space } from 'antd'
import FeatureCard from './FeatureCard'
import { PlusOutlined } from '@ant-design/icons'
import AddAnnouncement from './AddAnnouncement'

const Announcements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = [
        {
            title: "Organization Dashboard",
            description: "View and manage all organizational activities, KPIs, and key updates in one place.",
            instructions: [
                "Navigate to the dashboard from the main menu.",
                "Review organization-wide KPIs and performance charts.",
                "Use filters to customize data views.",
                "Export reports for analysis or presentations."
            ]
        },
        {
            title: "Summary Dashboard",
            description: "Get an at-a-glance view of project statuses, team activities, and important metrics.",
            instructions: [
                "Open the summary section from the dashboard.",
                "Check the project progress bars and timelines.",
                "Review team activities and pending tasks.",
                "Download summary reports if needed."
            ]
        },
        {
            title: "Project Management",
            description: "Plan, track, and manage projects efficiently with tasks, timelines, and dependencies.",
            instructions: [
                "Create a new project by clicking the 'New Project' button.",
                "Add tasks, assign owners, and set deadlines.",
                "Link dependencies and milestones.",
                "Monitor progress via Gantt charts or Kanban boards."
            ]
        },
        {
            title: "Task Tracking",
            description: "Stay on top of individual and team tasks, deadlines, and priorities.",
            instructions: [
                "Go to the 'Tasks' module from the navigation panel.",
                "Filter tasks by status, priority, or assignee.",
                "Update progress and add comments when necessary.",
                "Mark tasks as complete when finished."
            ]
        },
        {
            title: "User Management",
            description: "Control user access, roles, and permissions within the application.",
            instructions: [
                "Navigate to the 'Users' section in settings.",
                "Invite new users by email or username.",
                "Assign roles and set permissions as needed.",
                "Deactivate or remove users when necessary."
            ]
        }
    ];

    return (
        <Row gutter={[0, 10]}>
            <Col span={24}>
                <h1 className='text-lg'>Announcements</h1>
            </Col>

            <Col span={24}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Card className="shadow-xs min-h-[184px] flex justify-center items-center cursor-pointer" hoverable onClick={() => setIsModalOpen(true)}>
                            <Space direction='vertical' className='flex justify-center items-center'>
                                <PlusOutlined className='text-[24px]' />
                                <p className='text-[16px] font-light text-gray-400'>Add New Announcement</p>
                            </Space>
                        </Card>
                    </Col>

                    {
                        features.map((feature, index) => {
                            return (
                                <Col key={index} span={6}>
                                    <FeatureCard data={feature} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>

            <AddAnnouncement
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                loading={false}
            />
        </Row>
    )
}

export default Announcements