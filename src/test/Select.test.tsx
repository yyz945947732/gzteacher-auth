import { render } from "@testing-library/react";

import { Auth, SelectProps } from "../index";

const authConfig = {
  "select.option1": true,
  "select.option1_1": true,
  "select.option1_3": true,
};

function SelectExample({ dataSource }: SelectProps) {
  return (
    <Auth.Provider auth={authConfig}>
      <Auth.Select visible dataSource={dataSource} />
    </Auth.Provider>
  );
}

describe("Auth.Select", () => {
  test("Check if Select.Option should not render without auth", () => {
    const { container } = render(
      <SelectExample
        dataSource={[
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
        ]}
      />,
      {
        baseElement: document.documentElement,
      }
    );
    const html = container.ownerDocument.documentElement.innerHTML;
    expect(html).toContain("我是根结点1号");
    expect(html).toContain("我是子节点1_1号");
    expect(html).not.toContain("我是子节点1_2号");
    expect(html).toContain("我是子节点1_3号");
  });
});
