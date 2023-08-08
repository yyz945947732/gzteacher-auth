import type { Meta, StoryObj } from "@storybook/react";

import { Auth, DenyWrapperProps } from "../core";

const meta = {
  title: "Auth.DenyWrapper",
  component: Auth.DenyWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.DenyWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "user.deny": true,
  "user.edit": true,
};

const WrapperExample = (args: DenyWrapperProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>
        尝试在编辑区修改 <code>authCode</code> 为 <code> user.deny </code>
        以屏蔽以下内容 ⬇️
      </p>
      <Auth.DenyWrapper {...args}>{args.children}</Auth.DenyWrapper>
    </Auth.Provider>
  );
};

export const Wrapper = WrapperExample.bind({}) as Story;
Wrapper.args = {
  authCode: "user.watch",
  children: <h1>？！你不应该看到我，赶紧把我隐藏了...</h1>,
};
