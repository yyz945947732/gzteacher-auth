import type { Meta, StoryObj } from "@storybook/react";

import { Auth, TableProps } from "../core";

const meta = {
  title: "Auth.Table",
  component: Auth.Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Table>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "table.col1": true,
  "table.col2": true,
  "table.col2_1": true,
  "table.col2_2": true,
  "table.col2_3": true,
  "table.col4": true,
};

const TableExample = (args: TableProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>表格不显示无权限的列: </p>
      <Auth.Table {...args}>{args.children}</Auth.Table>
    </Auth.Provider>
  );
};

export const Table = TableExample.bind({}) as Story;
Table.args = {
  columns: [
    {
      dataIndex: "name",
      title: "姓名",
      auth: "table.col1",
    },
    {
      dataIndex: "contact",
      title: "联系方式",
      children: [
        {
          dataIndex: "phone",
          title: "移动电话",
        },
        {
          dataIndex: "landline",
          title: "座机",
        },
        {
          dataIndex: "email",
          title: "邮箱",
        },
      ],
      auth: "table.col2",
    },
    {
      dataIndex: "duty",
      title: "职务",
      auth: "table.col3",
    },
    {
      dataIndex: "sex",
      title: "性别",
      auth: "table.col4",
    },
  ],
  dataSource: [
    {
      name: "龙啸天",
      phone: "18888888888",
      landline: "110",
      email: "18888888888@qq.com",
      duty: "监狱长",
      sex: "不明",
    },
  ],
};
