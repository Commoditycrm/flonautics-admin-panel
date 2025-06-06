import React, { FC } from "react";
import { Modal, Space, Typography } from "antd";
import Image from "next/image";

import { IConfirmModal } from "../data/types";

const { Text } = Typography;

const ConfirmModal: FC<IConfirmModal> = ({
  isOpen,
  onClose,
  title,
  description,
  onOk,
  loading,
}) => {
  return (
    <Modal
      centered
      destroyOnHidden
      title={
        <Space>
          <Image
            src='/warning.svg'
            alt="warning icon"
            className="h-auto w-auto"
            width={8}
            height={8}
          />
          <Text className="heading-md">{title}</Text>
        </Space>
      }
      open={isOpen}
      onOk={onOk}
      onCancel={onClose}
      width={420}
      confirmLoading={loading}
      okText="Yes"
      cancelText="No"
    >
      <Text className="text-md" type="secondary">
        {description}
      </Text>
    </Modal>
  );
};

export default ConfirmModal;
