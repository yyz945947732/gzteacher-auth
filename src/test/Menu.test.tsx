import { render } from "@testing-library/react";

import { Auth, MenuProps } from "../index";

function MenuExample({ menuItems }: MenuProps) {
  return (
    <Auth.Provider
      auth={{
        "menu.pay": true,
        "menu.platform": true,
        "menu.wechat": true,
        "menu.alipay": true,
        "menu.taobao": true,
        "menu.taobao.web": true,
        "menu.taobao.app": true,
      }}
    >
      <Auth.Menu menuItems={menuItems} />
    </Auth.Provider>
  );
}

describe("Auth.Menu", () => {
  test("Checks Menu.Item without auth should not display", () => {
    const { container } = render(
      <MenuExample
        menuItems={[
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
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain("支付方式");
    expect(html).toContain("微信");
    expect(html).toContain("支付宝");
    expect(html).toContain("购物平台");
    expect(html).not.toContain("美团");
    expect(html).toContain("淘宝");
  });
});
