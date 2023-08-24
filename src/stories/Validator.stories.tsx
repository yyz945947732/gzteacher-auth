import type { Meta, StoryObj } from "@storybook/react";

import { Auth, ValidatorProps } from "../core";

const meta = {
  title: "Auth.Validator",
  component: Auth.Validator,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Validator>;

export default meta;
type Story = StoryObj<typeof meta>;

const ValidatorExample = (args: ValidatorProps) => {
  return (
    <Auth.Provider auth={{}}>
      <p>已知您没有任何权限 </p>
      <p>你可以通过 Validator 实现更灵活的权限配置</p>
      <Auth.Validator {...args}>{args.children}</Auth.Validator>
    </Auth.Provider>
  );
};

export const Validator: Story = {
  render: ValidatorExample,
  args: {
    validator: [
      {
        match: /user\.(.*)/,
        validate: () => true,
      },
    ],
    children: (
      <Auth.Wrapper authCode="user.watch">
        <b>你本来没有权限的，但你通过一些手段看到了我</b>
      </Auth.Wrapper>
    ),
  },
};
