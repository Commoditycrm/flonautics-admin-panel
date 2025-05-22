import { TableColumnsType } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Rule } from "antd/es/form";
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
};

export type ICustomTable = {
  allowDrag?: boolean;
  dataSource: Array<object> | undefined;
  columns: TableColumnsType;
  loading?: boolean;
  rowKey: string;
  onPageChange?: never;
  totalCount?: number;
  currentPage?: number;
  className?: string;
  isRowExpandable?: boolean;
  scroll?: boolean;
  footer?: React.ReactNode;
  pageSize?: number;
  onRowClick: (record: AnyObject) => void;
};