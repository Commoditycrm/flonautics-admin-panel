"use client"
import React from 'react'
import { Col, Row } from 'antd'

import CustomTable from '@/src/hoc/CustomTable/CustomTable'

const Organizations = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '3',
            name: 'John Dow',
            age: 42,
            address: '10 Street',
        },
    ];

    const columns = [
        {
            title: 'Organization Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Total Users',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Total Projects',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <Row>
                <Col span={24}></Col>

                <Col span={24}>
                    <CustomTable
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={"key"}
                        onRowClick={() => { }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Organizations