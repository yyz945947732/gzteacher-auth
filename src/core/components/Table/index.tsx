import "@alifd/next/lib/table/style2";

import { Table as TableComponent } from "@alifd/next";
import type { TableProps as TableComponentProps } from "@alifd/next/types/table/index";

import { useAuthData } from "../../hooks/useAuthData";

export interface TableProps extends TableComponentProps {}

function Table(prop: TableProps) {
  const { children, columns, ...otherProps } = prop;
  const authColumns = useAuthData(columns);

  return (
    <TableComponent.StickyLock columns={authColumns} {...otherProps}>
      {children}
    </TableComponent.StickyLock>
  );
}

Table.Column = TableComponent.Column;
Table.ColumnGroup = TableComponent.ColumnGroup;
Table.GroupFooter = TableComponent.GroupFooter;
Table.GroupHeader = TableComponent.GroupHeader;

export default Table;
