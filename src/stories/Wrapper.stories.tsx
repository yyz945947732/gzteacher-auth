import type { Meta, StoryObj } from "@storybook/react";

import { Auth, WrapperProps } from "../core";

const meta = {
  title: "Auth.Wrapper",
  component: Auth.Wrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "user.watch": true,
  "user.add": true,
  "user.edit": true,
};

const WrapperExample = (args: WrapperProps) => {
  return (
    <Auth.Provider auth={authConfig}>
      <p>已知您有以下权限: </p>
      <ul>
        {Object.keys(authConfig).map((authCode) => (
          <li key={authCode}>{authCode}</li>
        ))}
      </ul>
      <p>
        尝试在编辑区修改 <code>authCode</code> 以查看以下隐藏内容 ⬇️
      </p>
      <Auth.Wrapper {...args}>{args.children}</Auth.Wrapper>
    </Auth.Provider>
  );
};

export const Wrapper = WrapperExample.bind({}) as Story;
Wrapper.args = {
  authCode: "user.noAuth",
  children: (
    <h3 style={{ color: "green" }}>
      离婚这么多年了, 竟然在这里里遇到你了,
      你过得挺好我也就放心了。孩子上四年级了, 成绩一直都很好,
      连续三年拿班上第一名, 就是性格像你, 每次生气就逃避,
      孩子总问妈妈什么时候来参加家长会! 有时间就来看看孩子吧, 多陪陪孩子,
      孩子明天想吃肯德基, 因为今天是肯德基疯狂星期四, v孩子30, 孩子请我吃。
    </h3>
  ),
};
