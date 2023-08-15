import type { Meta, StoryObj } from "@storybook/react";

import { Auth, MenuProps } from "../core";

const meta = {
  title: "Auth.Menu",
  component: Auth.Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "menu.pay": true,
  "menu.platform": true,
  "menu.wechat": true,
  "menu.alipay": true,
  "menu.taobao": true,
  "menu.taobao.web": true,
  "menu.taobao.app": true,
};

const MenuExample = (args: MenuProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>菜单不显示无权限的菜单项: </p>
      <Auth.Menu {...args} />
    </Auth.Provider>
  );
};

export const Menu: Story = {
  render: MenuExample,
  args: {
    menuItems: [
      {
        label: "支付方式",
        itemType: "group",
        auth: "menu.pay",
        key: "pay",
        children: [
          {
            label: "微信",
            key: "wechat",
            auth: "menu.wechat",
          },
          {
            label: "支付宝",
            key: "alipay",
            auth: "menu.alipay",
          },
        ],
      },
      {
        label: "购物平台",
        itemType: "group",
        auth: "menu.platform",
        key: "platform",
        children: [
          {
            label: "美团",
            key: "meituan",
            auth: "menu.meituan",
          },
          {
            label: "淘宝",
            key: "taobao",
            auth: "menu.taobao",
            itemType: "subMenu",
            children: [
              {
                label: "淘宝网站",
                key: "taobao.web",
                auth: "menu.taobao.web",
              },
              {
                label: "淘宝APP",
                key: "taobao.app",
                auth: "menu.taobao.app",
              },
            ],
          },
        ],
      },
    ],
  },
};
