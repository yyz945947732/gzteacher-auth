import type { Meta, StoryObj } from "@storybook/react";

import { Auth, NavProps } from "../core";

const meta = {
  title: "Auth.Nav",
  component: Auth.Nav,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Nav>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "nav.pay": true,
  "nav.platform": true,
  "nav.wechat": true,
  "nav.alipay": true,
  "nav.taobao": true,
  "nav.taobao.web": true,
  "nav.taobao.app": true,
};

const NavExample = (args: NavProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>导航不显示无权限的导航项: </p>
      <Auth.Nav {...args} />
    </Auth.Provider>
  );
};

export const Nav: Story = {
  render: NavExample,
  args: {
    navItems: [
      {
        label: "支付方式",
        itemType: "group",
        auth: "nav.pay",
        key: "pay",
        children: [
          {
            label: "微信",
            key: "wechat",
            auth: "nav.wechat",
          },
          {
            label: "支付宝",
            key: "alipay",
            auth: "nav.alipay",
          },
        ],
      },
      {
        label: "购物平台",
        itemType: "group",
        auth: "nav.platform",
        key: "platform",
        children: [
          {
            label: "美团",
            key: "meituan",
            auth: "nav.meituan",
          },
          {
            label: "淘宝",
            key: "taobao",
            auth: "nav.taobao",
            itemType: "subNav",
            children: [
              {
                label: "淘宝网站",
                key: "taobao.web",
                auth: "nav.taobao.web",
              },
              {
                label: "淘宝APP",
                key: "taobao.app",
                auth: "nav.taobao.app",
              },
            ],
          },
        ],
      },
    ],
  },
};
