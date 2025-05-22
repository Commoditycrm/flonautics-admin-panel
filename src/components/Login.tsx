
"use client"
import React from "react"
import { Col, Form, Row } from "antd"

import CustomInput from "../hoc/CustomInputs/CustomInput"
import CustomButton from "../hoc/CustomButton/CustomButton"
import { getInputRegex } from "../data/helpers/getInputRegex"

const Login = () => {

    const regex = getInputRegex("email");

    const handleFinish = (values: { email: string, password: string }) => {
        console.log(values, "values")
    }

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <Form className="w-2/7" onFinish={handleFinish}>
                <div className="p-8 flex flex-col justify-center items-center border border-gray-200 shadow-md gap-4 rounded-xl">
                    <h1 className="text-xl tracking-wider">Flonautics Admin</h1>

                    <Row>
                        <Col span={24}>
                            <CustomInput
                                name={"email"}
                                placeholder={"Enter your email"}
                                rules={[
                                    { required: true, message: `Email is required` },
                                    { pattern: regex?.pattern, message: regex?.message },
                                ]}
                            />
                        </Col>

                        <Col span={24}>
                            <CustomInput
                                name={"password"}
                                type="password"
                                placeholder={"Enter your password"}
                                rules={[{ required: true, message: "Password is required" }]}
                            />
                        </Col>

                        <Col span={24}>
                            <CustomButton
                                value={"Login"}
                                type={"primary"}
                                onClick={() => { }}
                                htmlType="submit"
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default Login