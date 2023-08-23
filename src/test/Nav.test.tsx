import { render } from "@testing-library/react";

import { Auth, NavProps } from "../index";

function NavExample({ navItems }: NavProps) {
  return (
    <Auth.Provider
      auth={{
        "nav.pay": true,
        "nav.platform": true,
        "nav.wechat": true,
        "nav.alipay": true,
        "nav.taobao": true,
        "nav.taobao.web": true,
        "nav.taobao.app": true,
      }}
      validator={[
        {
          match: "nav.jingdong",
          validate: (_authCode, auth) => {
            if (auth["nav.alipay"]) {
              return true;
            }
            return false;
          },
        },
      ]}
    >
      <Auth.Nav navItems={navItems} />
    </Auth.Provider>
  );
}

describe("Auth.Nav", () => {
  test("Checks Nav.Item without auth should not display", () => {
    const { container } = render(
      <NavExample
        navItems={[
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
                label: "京东",
                key: "jingdong",
                auth: "nav.jingdong",
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
    expect(html).toContain("京东");
  });
});
