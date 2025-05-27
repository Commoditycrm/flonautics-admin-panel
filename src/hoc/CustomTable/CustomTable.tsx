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
      pagination={{
        simple: true,
        showSizeChanger: false,
        pageSize: pageSize,
        total: totalCount,
        size: "small",
      }}
      onChange={onPageChange}
      onRow={(record) => ({ onClick: () => onRowClick(record) })}
      {...(scroll && { scroll: { x: "max-content" } })}
    />
  )
}

export default CustomTable