import React from "react"
import { Row, Col } from "antd"

const OrganizationDetails = () => {

    const cardsArr = [
        { title: "Total Users", description: "34" },
        { title: "Total Projects", description: "4" },
        { title: "Total Backlogs", description: "475" },
    ]

    return (
        <div>
            <Row gutter={[0, 10]}>
                <Col span={24}>
                    <h1 className="text-lg">AUM Template</h1>
                </Col>

                <Col span={24}>
                    <Row gutter={20}>
                        {cardsArr.map((card, index) => (
                            <Col key={index} span={5}>
                                <div className="bg-white shadow-md rounded-md p-4 border border-gray-100 flex flex-col gap-3">
                                    <h2 className="text-[15px]">{card.title}</h2>
                                    <span className="text-gray-500">{card.description}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default OrganizationDetails