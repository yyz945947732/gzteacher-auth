import type { Meta, StoryObj } from "@storybook/react";

import { Auth, ButtonProps } from "../core";

const meta = {
  title: "Auth.Button",
  component: Auth.Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Button>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "user.watch": true,
  "user.add": true,
  "user.edit": true,
};

const ButtonExample = (args: ButtonProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>
        尝试在编辑区修改 <code>authCode</code> 让内容变成按钮
      </p>
      <Auth.Button {...args}>{args.children}</Auth.Button>
    </Auth.Provider>
  );
};

export const Button = ButtonExample.bind({}) as Story;
Button.args = {
  authCode: "user.noAuth",
  children: "点我",
  onClick: () => window.alert("您的电脑即将爆炸"),
  type: "primary",
};
