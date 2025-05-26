import { ICustomTable } from '@/src/data/types'
import { Table } from 'antd'
import React, { FC } from 'react'

const CustomTable: FC<ICustomTable> = ({
  className,
  dataSource,
  columns,
  loading,
  scroll,
  pageSize,
  totalCount,
  rowKey,
  onRowClick,
  onPageChange
}) => {
  return (
    <Table
      showSorterTooltip={false}
      className={className}
      loading={loading}
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      {...(scroll && { scroll: { x: "max-content" } })}
      pagination={{
        simple: true,
        showSizeChanger: false,
        pageSize: pageSize,
        total: totalCount,
        size: "small",
      }}
      onRow={(record) => ({ onClick: () => onRowClick(record) })}
      onChange={onPageChange}
    />
  )
}

export default CustomTable