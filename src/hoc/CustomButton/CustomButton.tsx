import React, { FC } from "react";
import { Button } from "antd";

import { ICustomButton } from "@/src/data/types";

const CustomButton: FC<ICustomButton> = ({ value, onClick, icon, type, disabled, loading, htmlType }) => {
    return (
        <Button
            id={type}
            className="p-[8px]"
            type={type}
            onClick={onClick}
            icon={icon}
            loading={loading}
            disabled={disabled}
            style={{ borderRadius: "4px", fontSize: "13px", height: "32px", width:"100%" }}
            htmlType={htmlType}
        >
            {value}
        </Button>
    );
};

export default CustomButton;
