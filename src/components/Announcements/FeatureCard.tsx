import React, { FC } from 'react'
import { Card, Col, Collapse, CollapseProps, Row, Space } from 'antd'
import { IFeaturecard } from '@/src/data/types';

const FeatureCard: FC<IFeaturecard> = ({ data }) => {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Instructions to follow',
            children: <p>{data.instructions}</p>,
        }
    ];

    return (
        <Card className="shadow-xs min-h-[184px]">
            <Row gutter={[0, 8]}>
                <Col span={24}>
                    <Space direction='vertical' size={2}>
                        <span className='text-[16px]'>{data.title}</span>
                        <span className='text-md text-gray-500'>{data.description}</span>
                    </Space>
                </Col>

                <Col span={24}>
                    <Collapse items={items} bordered={false} />
                </Col>
            </Row>
        </Card>
    )
}

export default FeatureCard