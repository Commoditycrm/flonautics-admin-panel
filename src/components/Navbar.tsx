import React from "react";
import { Avatar, Col, Divider, Popover, Row, Space, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import firebaseAuth from "@/firebaseConfig";
import { clearCookies } from "../data/helpers/authCookies";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    clearCookies();
    router.push("/");
  };

  const popoverContent = (
    <Row className="pt-2 pb-0">
      <Col span={24} className="px-2">
        <Space>
          <Avatar icon={<UserOutlined />} size={38} />
          <Space direction="vertical" size={0}>
            <Text className="text-md">Username</Text>
            <Text className="text-md" type="secondary">
              email
            </Text>
          </Space>
        </Space>
      </Col>

      <Col span={24} className="m-0 mt-4 mb-2">
        <Divider />
      </Col>

      <Col
        span={24}
        onClick={handleLogout}
        className="px-2 py-2 rounded-md hover:bg-[#e6f4ff] cursor-pointer transition"
      >
        <Space>
          <LogoutOutlined className="text-[16px]" />
          <Text className="text-md">Logout</Text>
        </Space>
      </Col>
    </Row>
  );

  return (
    <div className="flex items-center justify-between h-full px-4">
      <span className="cursor-pointer font-mono text-2xl font-bold text-[#1677ff]">
        floNautics
      </span>

      <Popover
        content={popoverContent}
        placement="bottomLeft"
        mouseLeaveDelay={0.4}
      >
        <Avatar
          style={{ backgroundColor: "#1677ff" }}
          size={36}
          icon={<UserOutlined />}
        />
      </Popover>
    </div>
  );
};

export default Navbar;
