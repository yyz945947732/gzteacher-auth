import type { Meta, StoryObj } from "@storybook/react";

import { Auth, ProxyProps } from "../core";

const meta = {
  title: "Auth.Proxy",
  component: Auth.Proxy,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Proxy>;

export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "user.watch": true,
};

const ProxyExample = (args: ProxyProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>
        尝试在编辑区通过代理 <code>user.watch</code> 权限到{" "}
        <code>user.proxy</code> 权限以展示以下内容 ⬇️
      </p>
      <Auth.Proxy {...args}>{args.children}</Auth.Proxy>
    </Auth.Provider>
  );
};

export const Proxy: Story = {
  render: ProxyExample,
  args: {
    authProxy: {
      "user.proxy": "user.noAuth",
    },
    children: (
      <Auth.Wrapper authCode="user.proxy">
        代理成功，你拥有了 <code>user.watch</code> 权限。
      </Auth.Wrapper>
    ),
  },
};
