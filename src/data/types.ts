import { TableColumnsType, TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Rule } from "antd/es/form";
import { Organization } from "flonautics-project-types";
import { ChangeEvent } from "react";

export type ICustomInput = {
  name: string;
  value?: string;
  placeholder: string;
  rules?: Rule[];
  required?: boolean;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ICustomButton = {
  value: string;
  type: "primary" | "default";
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: never;
  htmlType?: "button" | "submit" | "reset";
  color?: string;
};

export type ICustomTable = {
  allowDrag?: boolean;
  dataSource: Array<object> | undefined;
  columns: TableColumnsType;
  loading?: boolean;
  rowKey: string;
  onPageChange?: (config: TablePaginationConfig, filters: AnyObject) => void;
  totalCount?: number;
  currentPage?: number;
  className?: string;
  isRowExpandable?: boolean;
  scroll?: boolean;
  footer?: React.ReactNode;
  pageSize?: number;
  onRowClick: (record: AnyObject) => void;
};

export type ISummary = {
  orgDetail: Organization[];
  cards: Array<{ title: string; description: number }>;
};

export type IAlphabetAvatar = {
  name: string | undefined;
  size: number;
  count?: number | string;
};

export type IConfirmModal = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onOk: () => void;
  loading?: boolean;
};

export type AttacthmentStorageType = {
  fileCount: number;
  totalBytes: number;
  totalMB: number;
};
