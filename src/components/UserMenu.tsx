"use client";

import React from "react";
import { Avatar, Popover, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { firebaseAuth } from "@/firebaseConfig";
import { clearCookies } from "../data/helpers/authCookies";
import client from "@/apolloClient";
import { useAuthStore } from "../store/useAuthStore";

const { Text } = Typography;

const UserMenu = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Logout logic unchanged from the original Navbar.
  const handleLogout = async () => {
    await signOut(firebaseAuth);
    clearCookies();
    client.clearStore();
    router.push("/");
  };

  const initial = (user?.displayName || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  const popoverContent = (
    <div className="w-56 pt-1">
      <div className="flex items-center gap-3 px-1 pb-3">
        <Avatar size={40} className="!bg-brand/10 !text-brand">
          {initial}
        </Avatar>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-ink">
            {user?.displayName || "Admin"}
          </div>
          <Text type="secondary" className="block truncate !text-xs">
            {user?.email}
          </Text>
        </div>
      </div>
      <div className="border-t border-border-soft pt-1">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-ink-soft transition-colors hover:bg-[#fdeceb] hover:text-[#e5484d]"
        >
          <LogoutOutlined className="text-[15px]" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      placement="topRight"
      trigger="click"
      arrow={false}
    >
      <button className="flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition-colors hover:border-border hover:bg-[#fafafa]">
        <Avatar size={36} icon={<UserOutlined />} className="!bg-brand shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-ink">
            {user?.displayName || "Admin"}
          </div>
          <div className="truncate text-xs text-muted">{user?.email}</div>
        </div>
      </button>
    </Popover>
  );
};

export default UserMenu;
