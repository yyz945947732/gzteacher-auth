import { render } from "@testing-library/react";

import { Auth, TabProps } from "../index";

const TAB1_TITLE = "tab1";
const TAB2_TITLE = "tab2";
const TAB3_TITLE = "tab3";
const TAB1_CONTENT = "content1";
const TAB2_CONTENT = "content2";
const TAB3_CONTENT = "content3";

function TabExample({ tabItems }: TabProps) {
  return (
    <Auth.Provider
      auth={{
        "user.tab1": true,
        "user.tab3": true,
      }}
    >
      <Auth.Tab tabItems={tabItems} />
    </Auth.Provider>
  );
}

describe("Auth.Tab", () => {
  test("Checks TabItem without auth should not display", () => {
    const { container } = render(
      <TabExample
        tabItems={[
          {
            key: TAB1_TITLE,
            title: TAB1_TITLE,
            children: TAB1_CONTENT,
            auth: "user.tab1",
          },
          {
            key: TAB2_TITLE,
            title: TAB2_TITLE,
            children: TAB2_CONTENT,
            auth: "user.tab2",
          },
          {
            key: TAB3_TITLE,
            title: TAB3_TITLE,
            children: TAB3_CONTENT,
            auth: "user.tab3",
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TAB1_TITLE);
    expect(html).not.toContain(TAB2_TITLE);
    expect(html).toContain(TAB3_TITLE);
    expect(html).toContain(TAB1_CONTENT);
  });
});
