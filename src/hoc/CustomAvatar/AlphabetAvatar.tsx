import React, { FC } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { getColorByLetter } from "@/src/data/helpers/getColorByLetter";
import { IAlphabetAvatar } from "@/src/data/types";


const AlphabetAvatar: FC<IAlphabetAvatar> = ({ name, size, count }) => {
  const firstLetter = name?.[0] || "?";

  const avatarColor = getColorByLetter(firstLetter);

  return (
    <Avatar size={size} style={{ backgroundColor: name && avatarColor }}>
      {name ? (
        <span className="text-[15px] text-white">
          {name
            .split(" ")
            .map((word: string) => word[0])
            .join("")
            .toUpperCase()}
          {count && count}
        </span>
      ) : (
        <UserOutlined />
      )}
    </Avatar>
  );
};

export default AlphabetAvatar;
