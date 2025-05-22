import React from "react"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';

const Navbar = () => {
    return (
        <div className="flex items-center justify-between h-full px-4">
            <span className="cursor-pointer font-mono text-2xl font-bold text-[#1677ff]">
                floNautics
            </span>

            <Avatar style={{ backgroundColor: '#1677ff' }} size={36} icon={<UserOutlined />} />
        </div>
    )
}

export default Navbar