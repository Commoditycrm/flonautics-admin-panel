"use client"
import React from 'react'
import { Col, Row } from 'antd'
import { useRouter } from 'next/navigation'
// import { useQuery } from '@apollo/client'

import CustomTable from '@/src/hoc/CustomTable/CustomTable'
// import { GET_ALL_ORGANIZATIONS } from '@/src/gql/organizations/GET_ALL_ORGANIZATIONS'

// const variables = {
//     options: {
//         limit: 10,
//         offset: 0,
//         sort: [
//             {
//                 createdAt: "DESC",
//             },
//         ],
//     },
// };

const Organizations = () => {

    const router = useRouter()

    // const { data, loading, error } = useQuery(GET_ALL_ORGANIZATIONS, {
    //     variables,
    // });

    // if (loading) return <p>Loading organizations...</p>;
    // if (error) return <p>Error loading organizations: {error.message}</p>;

    // console.log(data, "data")

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
            title: 'Created By',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created On',
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
                <Col span={24}>
                    <CustomTable
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={"key"}
                        onRowClick={() => router.push("/organizations/1")}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Organizations