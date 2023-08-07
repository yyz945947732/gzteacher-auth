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
  "select.option2": true,
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

export const Select = SelectExample.bind({}) as Story;
Select.args = {
  dataSource: [
    {
      value: "value1",
      label: "我的权限是 select.option1",
      auth: "select.option1",
    },
    {
      value: "value2",
      label: "我的权限是 select.option2",
      auth: "select.option2",
    },
    {
      value: "value3",
      label: "我的权限是 select.option3",
      auth: "select.option3",
    },
    {
      value: "value4",
      label: "我的权限是 select.option4",
      auth: "select.option4",
    },
  ],
};
