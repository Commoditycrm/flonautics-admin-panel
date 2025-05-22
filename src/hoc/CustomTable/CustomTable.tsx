import React, {
    FC,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { Table} from "antd";
  import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
  import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";
  import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
  import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
  } from "@dnd-kit/sortable";
  
//   import AlphabetAvatar from "../CustomAvatar/AlphabetAvatar";
//   import { useLazyQuery } from "@apollo/client";
//   import { GET_COMMENTS_BY_ITEM } from "@/gql";
//   import { BacklogItem, Comment } from "@/@types/ogm.types";
//   import extractContent from "./utils/extractContent";
//   import { displayDate } from "@/components/Comments/utils/dateUtils";
import { BodyCellProps, DragIndexState, HeaderCellProps } from "@/src/data/interfaces";
import { ICustomTable } from "@/src/data/types";
  
//   const { Text, Link } = Typography;
  
  const DragIndexContext = createContext<DragIndexState>({
    active: -1,
    over: -1,
  });
  
  const dragActiveStyle = (dragState: DragIndexState, id: string) => {
    const { active, over, direction } = dragState;
    // drag active style
    let style: React.CSSProperties = {};
    if (active && active === id) {
      style = { backgroundColor: "gray", opacity: 0.5 };
    }
    // dragover dashed style
    else if (over && id === over && active !== over) {
      style =
        direction === "right"
          ? { borderRight: "1px dashed gray" }
          : { borderLeft: "1px dashed gray" };
    }
    return style;
  };
  
  const TableBodyCell: FC<BodyCellProps> = (props) => {
    const dragState = useContext<DragIndexState>(DragIndexContext);
    return (
      <td
        {...props}
        style={{ ...props.style, ...dragActiveStyle(dragState, props.id) }}
      />
    );
  };
  
  const TableHeaderCell: FC<HeaderCellProps> = (props) => {
    const dragState = useContext(DragIndexContext);
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
      id: props.id,
    });
    const style: React.CSSProperties = {
      ...props.style,
      cursor: "move",
      ...(isDragging
        ? { position: "relative", zIndex: 9999, userSelect: "none" }
        : {}),
      ...dragActiveStyle(dragState, props.id),
    };
    return (
      <th
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };
  
  const CustomTable: FC<ICustomTable> = ({
    allowDrag,
    dataSource,
    columns: tableColumns,
    totalCount,
    loading,
    rowKey,
    onPageChange,
    className,
    // isRowExpandable = false,
    scroll = false,
    pageSize = 10,
    footer,
    onRowClick,
  }) => {
    const [dragIndex, setDragIndex] = useState<DragIndexState>({
      active: -1,
      over: -1,
    });
    // const [visible, setVisible] = useState(false);
  
    // const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
    // const [expandedRows, setExpandedRows] = useState<string[]>([]);
    // const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  
    const transformColumns = useCallback(
      () =>
        tableColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({ id: `${i}` }),
          onCell: () => ({ id: `${i}` }),
        })),
      [tableColumns]
    );
    const [columns, setColumns] = useState(() => transformColumns());
  
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1,
        },
      })
    );
  
    const onDragEnd = ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        setColumns((prevState) => {
          const activeIndex = prevState.findIndex((i) => i.key === active?.id);
          const overIndex = prevState.findIndex((i) => i.key === over?.id);
          return arrayMove(prevState, activeIndex, overIndex);
        });
      }
      setDragIndex({ active: -1, over: -1 });
    };
  
    const onDragOver = ({ active, over }: DragOverEvent) => {
      const activeIndex = columns.findIndex((i) => i.key === active.id);
      const overIndex = columns.findIndex((i) => i.key === over?.id);
      setDragIndex({
        active: active.id,
        over: over?.id,
        direction: overIndex > activeIndex ? "right" : "left",
      });
    };
  
    // const [getCommentsByItem] = useLazyQuery(GET_COMMENTS_BY_ITEM, {
    //   onError(error) {
    //     //Todo:handling error using message handler
    //     console.log(error);
    //   },
    // });
  
    // const handleGetCommentsByItem = async (
    //   item: BacklogItem,
    //   expanded: boolean
    // ) => {
    //   const itemId = item?.id;
    //   if (!itemId) return;
  
    //   if (!expanded) {
    //     // Remove comments when collapsing
    //     setCommentsMap((prev) => {
    //       const updatedMap = { ...prev };
    //       delete updatedMap[itemId];
    //       return updatedMap;
    //     });
  
    //     // Remove the row from expanded rows
    //     setExpandedRows((prev) => prev.filter((id) => id !== itemId));
    //     return;
    //   }
  
    //   setExpandedRows((prev) => [...prev, itemId]); // Track expanded row
    //   setLoadingMap((prev) => ({ ...prev, [itemId]: true }));
  
    //   try {
    //     const { data } = await getCommentsByItem({
    //       variables: {
    //         where: {
    //           commentParent: {
    //             BacklogItem: {
    //               id: itemId,
    //             },
    //           },
    //         },
    //         options: {
    //           limit: 2,
    //           sort: [{ createdAt: "DESC" }],
    //         },
    //       },
    //     });
  
    //     // Map comments based on their parent ID
    //     const mappedComments = data?.comments?.reduce(
    //       (acc: { [x: string]: Comment[] }, comment: Comment) => {
    //         if (comment.commentParent?.id) {
    //           acc[comment.commentParent?.id] =
    //             acc[comment.commentParent.id] || [];
    //           acc[comment.commentParent?.id].push(comment);
    //         }
    //         return acc;
    //       },
    //       {} as Record<string, Comment[]>
    //     );
  
    //     setCommentsMap((prev) => ({
    //       ...prev,
    //       [itemId]: mappedComments[itemId] || [],
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoadingMap((prev) => ({ ...prev, [itemId]: false }));
    //   }
    // };
  
    // comments renderer
    // const renderComments = (comments: Comment[], key: string) => {
    //   return (
    //     <List
    //       key={key}
    //       className="px-1"
    //       itemLayout="horizontal"
    //       dataSource={comments}
    //       loading={loadingMap[key]}
    //       renderItem={(item: Comment, index) => {
    //         const { imgSrc, text } = extractContent(item?.message);
    //         return (
    //           <List.Item key={index}>
    //             <List.Item.Meta
    //               avatar={
    //                 <AlphabetAvatar name={item.createdBy?.name} size={34} />
    //               }
    //               title={
    //                 <div className="flex items-center gap-2">
    //                   {imgSrc ? (
    //                     <Image
    //                       preview={{
    //                         visible,
    //                         src: imgSrc,
    //                         onVisibleChange: (value) => setVisible(value),
    //                       }}
    //                     />
    //                   ) : (
    //                     <Text>{text}</Text>
    //                   )}
    //                 </div>
    //               }
    //               description={
    //                 <div className={`flex ${imgSrc ? "justify-between" : ""} items-center w-full`}>
    //                   <div className="flex items-center gap-2">
    //                     {imgSrc && (
    //                       <Link
    //                         onClick={() => setVisible(true)}
    //                         className="text-blue-500"
    //                       >
    //                         View Attachment
    //                       </Link>
    //                     )}
    //                   </div>
  
    //                   {/* Right side: Created Date & User */}
    //                   <Text className="text-xs text-gray-500">
    //                     On {displayDate(new Date(item.createdAt))} by&nbsp;
    //                     {item.createdBy?.name}
    //                   </Text>
    //                 </div>
    //               }
    //             />
    //           </List.Item>
    //         );
    //       }}
    //     />
    //   );
    // };
  
    useEffect(() => {
      setColumns(transformColumns());
    }, [transformColumns]);
  
    return allowDrag ? (
      // It will render draggable columns table
      <DndContext
        sensors={sensors}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={columns.map((i) => i.key)}
          strategy={horizontalListSortingStrategy}
        >
          <DragIndexContext.Provider value={dragIndex}>
            <Table
              showSorterTooltip={false}
              className={className}
              loading={loading}
              rowKey={rowKey}
              columns={columns}
              dataSource={dataSource}
              {...(scroll && { scroll: { x: "max-content" } })}
              components={{
                header: { cell: TableHeaderCell },
                body: { cell: TableBodyCell },
              }}
              pagination={{
                simple: true,
                showSizeChanger: false,
                pageSize: pageSize,
                total: totalCount,
                size: "small",
              }}
              onRow={(record) => ({ onClick: () => onRowClick(record) })}
              onChange={onPageChange}
            //   {...(isRowExpandable && {
            //     expandable: {
            //       onExpand: (expanded, record) => {
            //         handleGetCommentsByItem(record as BacklogItem, expanded);
            //       },
            //       expandedRowRender: (record) =>
            //         renderComments(commentsMap[record.id] || [], record.id),
            //       expandedRowKeys: expandedRows,
            //     },
            //   })}
              {...(footer && { footer: () => footer })}
            />
          </DragIndexContext.Provider>
        </SortableContext>
        <DragOverlay>
          <th style={{ backgroundColor: "gray", padding: 16 }}>
            {
              columns[columns.findIndex((i) => i.key === dragIndex.active)]
                ?.title as React.ReactNode
            }
          </th>
        </DragOverlay>
      </DndContext>
    ) : (
      // It will render simple columns table
      <Table
        showSorterTooltip={false}
        className={className}
        loading={loading}
        rowKey={(record) => record.id || record.key}
        columns={tableColumns}
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
        // {...(isRowExpandable && {
        //   expandable: {
        //     onExpand: (expanded, record) => {
        //       handleGetCommentsByItem(record as BacklogItem, expanded);
        //     },
        //     expandedRowRender: (record) =>
        //       renderComments(commentsMap[record.id] || [], record.id),
        //     expandedRowKeys: expandedRows,
        //     rowExpandable(record) {
        //       if (record.commentsConnection?.totalCount > 0) return true;
        //       return false;
        //     },
        //   },
        // })}
        {...(footer && { footer: () => footer })}
      />
    );
  };
  
  export default CustomTable;
  