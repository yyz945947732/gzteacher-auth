import "@alifd/next/es/table/style2";

import { Table as TableComponent } from "@alifd/next";
import type { TableProps as TableComponentProps } from "@alifd/next/types/table/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface TableProps extends TableComponentProps {
  /** 权限验证字段，默认为 `auth` */
  authKey?: string;
}

function Table(prop: TableProps) {
  useDetect(Table.name);

  const { children, columns, authKey, ...tableProps } = prop;
  const authColumns = useAuthData(columns, { authKey });

  return (
    <TableComponent.StickyLock columns={authColumns} {...tableProps}>
      {children}
    </TableComponent.StickyLock>
  );
}

Table.Column = TableComponent.Column;
Table.ColumnGroup = TableComponent.ColumnGroup;
Table.GroupFooter = TableComponent.GroupFooter;
Table.GroupHeader = TableComponent.GroupHeader;

export default Table;
