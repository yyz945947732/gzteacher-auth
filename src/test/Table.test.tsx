import { render } from "@testing-library/react";

import { Auth, TableProps } from "../index";

const COLUMN1_HEADER_DATAINDEX = "name";
const COLUMN2_HEADER_DATAINDEX = "sex";
const COLUMN3_HEADER_DATAINDEX = "age";
const COLUMN4_HEADER_DATAINDEX = "email";
const COLUMN1_HEADER_TITLE = "姓名";
const COLUMN2_HEADER_TITLE = "性别";
const COLUMN3_HEADER_TITLE = "年龄";
const COLUMN4_HEADER_TITLE = "邮箱";

const DATA_SOURCE = [
  {
    [COLUMN1_HEADER_DATAINDEX]: "张三",
    [COLUMN2_HEADER_DATAINDEX]: "女",
    [COLUMN3_HEADER_DATAINDEX]: 26,
    [COLUMN4_HEADER_DATAINDEX]: "16888888888@qq.com",
  },
];

function TableExample({ columns }: TableProps) {
  return (
    <Auth.Provider
      auth={{
        "user.column1": true,
        "user.column2": true,
        "user.column3": true,
      }}
    >
      <Auth.Table columns={columns} dataSource={DATA_SOURCE} />
    </Auth.Provider>
  );
}

describe("Auth.Table", () => {
  test("Checks Table.Column without auth should not display", () => {
    const { container } = render(
      <TableExample
        columns={[
          {
            dataIndex: COLUMN1_HEADER_DATAINDEX,
            title: COLUMN1_HEADER_TITLE,
            auth: "user.column1",
          },
          {
            dataIndex: COLUMN2_HEADER_DATAINDEX,
            title: COLUMN2_HEADER_TITLE,
            auth: "user.column2",
          },
          {
            dataIndex: COLUMN3_HEADER_DATAINDEX,
            title: COLUMN3_HEADER_TITLE,
            auth: "user.column3",
          },
          {
            dataIndex: COLUMN4_HEADER_DATAINDEX,
            title: COLUMN4_HEADER_TITLE,
            auth: "user.column4",
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(COLUMN1_HEADER_TITLE);
    expect(html).toContain(COLUMN2_HEADER_TITLE);
    expect(html).toContain(COLUMN3_HEADER_TITLE);
    expect(html).toContain("张三");
    expect(html).not.toContain(COLUMN4_HEADER_TITLE);
    expect(html).not.toContain("16888888888@qq.com");
  });
});
