import type { Meta, StoryObj } from "@storybook/react";

import { Auth, SelectProps } from "../core";

const meta = {
  title: "Auth.Select",
  component: Auth.Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Select>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "select.option1": true,
  "select.option1_1": true,
  "select.option1_3": true,
  "select.option2": true,
  "select.option2_1": true,
  "select.option4": true,
};

const SelectExample = (args: SelectProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>下拉框不显示无权限的选项: </p>
      <Auth.Select {...args} style={{ width: 200 }}>
        {args.children}
      </Auth.Select>
    </Auth.Provider>
  );
};

export const Select: Story = {
  render: SelectExample,
  args: {
    dataSource: [
      {
        value: "value1",
        label: "我是根结点1号",
        auth: "select.option1",
        children: [
          {
            value: "value1_1",
            label: "我是子节点1_1号",
            auth: "select.option1_1",
          },
          {
            value: "value1_2",
            label: "我是子节点1_2号",
            auth: "select.option1_2",
          },
          {
            value: "value1_3",
            label: "我是子节点1_3号",
            auth: "select.option1_3",
          },
        ],
      },
      {
        value: "value2",
        label: "我是根结点2号",
        auth: "select.option2",
        children: [
          {
            value: "value2_1",
            label: "我是子节点2_1号",
            auth: "select.option2_1",
          },
        ],
      },
      {
        value: "value3",
        label: "我是根结点3号",
        auth: "select.option3",
      },
      {
        value: "value4",
        label: "我是根结点4号",
        auth: "select.option4",
      },
    ],
  },
};
