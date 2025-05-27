import { TableColumnsType, TablePaginationConfig } from "antd";
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
  color?: string
};

export type ICustomTable = {
  allowDrag?: boolean;
  dataSource: Array<object> | undefined;
  columns: TableColumnsType;
  loading?: boolean;
  rowKey: string;
  onPageChange?: (config: TablePaginationConfig, filters: AnyObject) => void
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
  orgDetail: never[]
  cards: Array<{ title: string; description: number }>
}

export type IAlphabetAvatar = {
  name: string | undefined;
  size: number;
  count?: number | string;
};