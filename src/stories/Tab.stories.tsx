import type { Meta, StoryObj } from "@storybook/react";

import { Auth, TabProps } from "../core";

const meta = {
  title: "Auth.Tab",
  component: Auth.Tab,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Tab>;
export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "tab.item1": true,
  "tab.item2": true,
  "tab.item4": true,
};

const TabExample = (args: TabProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>标签页不显示无权限的标签: </p>
      <Auth.Tab {...args}>{args.children}</Auth.Tab>
    </Auth.Provider>
  );
};

export const Tab: Story = {
  render: TabExample,
  args: {
    tabItems: [
      {
        title: "第一章",
        children: (
          <p style={{ marginTop: 16 }}>
            从前有座山，山上有一个破庙，有一天，一个小和尚他来到庙里,看见庙里的水缸没水了，就挑来水倒满了水缸，还给观音瓶子里加满了水，干枯的杨枝终于恢复了生机。他每天挑水、念经、敲木鱼，夜里不让老鼠来偷东西，生活过得安稳自在。
          </p>
        ),
        auth: "tab.item1",
      },
      {
        title: "第二章",
        children: (
          <p style={{ marginTop: 16 }}>
            不久，来了个高和尚。他渴极了，他一到庙里，就把半缸水喝光了。小和尚让他去挑水，高和尚心想一个人去挑水太吃亏了
            ，他要小和尚和他一起去抬水。于是两个人抬着一只水桶去山下取水，抬水的时候水桶必须放在扁担的中央，要不不在中间，两个人就推来推去，谁都不想多出一点
            力气。
          </p>
        ),
        auth: "tab.item2",
      },
      {
        title: "第三章",
        children: (
          <p style={{ marginTop: 16 }}>
            后来，又来了个胖和尚。他也想喝水，但恰好缸里没有水了。小和尚和高和尚让他自己去挑，胖和尚挑来一担水，放下水桶就立刻咕咚咕咚的大喝起来，两桶水被喝了个精光。
            后来谁也不去挑水，从此三个和尚就没水喝了。
            大家各念各的经，各敲各的木鱼，观音菩萨面前的净水瓶也没人添水，柳枝枯萎了。夜里老鼠出来偷东西，谁也不管。结果老鼠打翻烛台，燃起了大火。和尚们慌了神，三个和尚这才一起奋力救火
            ，大火扑灭了，他们也觉醒了。 从此三个和尚齐心协力，自然也就有水喝了
            。
          </p>
        ),
        auth: "tab.item3",
      },
      {
        title: "第四章",
        children: <p style={{ marginTop: 16 }}>（完）</p>,
        auth: "tab.item4",
      },
    ],
  },
};
