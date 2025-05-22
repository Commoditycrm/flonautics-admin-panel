"use client";
import React, { useState } from "react";
import { Col, Form, Row } from "antd";

import CustomInput from "../hoc/CustomInputs/CustomInput";
import CustomButton from "../hoc/CustomButton/CustomButton";
import { getInputRegex } from "../data/helpers/getInputRegex";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "@/firebaseConfig";
import { setCookie } from "../data/helpers/authCookies";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const regex = getInputRegex("email");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );

      const { user } = userCredential;
      const idTokenResult = await user.getIdTokenResult();
      const accessToken = idTokenResult.token;
      setCookie("accessToken", accessToken, 2, "/", {
        secure: true,
        sameSite: "Strict",
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        let errorMessage =
          "Incorrect credentials. Check your email and password and try again.";

        if (errorCode === "auth/user-not-found") {
          errorMessage = "This email is not registered. Please sign up.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (errorCode === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later.";
        }
        form.setFields([
          {
            name: "password",
            errors: [errorMessage],
          },
        ]);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Form className="w-2/7" onFinish={handleFinish} form={form}>
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
                onClick={() => {}}
                htmlType="submit"
                loading={loading}
                disabled={loading}
              />
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default Login;
