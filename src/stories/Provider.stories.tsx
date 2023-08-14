import type { Meta, StoryObj } from "@storybook/react";

import { Auth, ProviderProps } from "../core";

const meta = {
  title: "Auth.Provider",
  component: Auth.Provider,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "user.watch": true,
  "user.add": true,
  "user.edit": true,
};

const ProviderExample = (args: ProviderProps) => {
  return (
    <div>
      <p>使用 Provider 包裹组件以支持权限相关能力</p>
      <hr />
      <Auth.Provider auth={args.auth}>{args.children}</Auth.Provider>
    </div>
  );
};

export const Provider: Story = {
  render: ProviderExample,
  args: {
    auth: authConfig,
    children: (
      <div>
        <Auth.Wrapper authCode="user.watch">
          <p>有权限的就能看到这句话</p>
        </Auth.Wrapper>
        <Auth.Button authCode="user.add" type="primary">
          有权限的就能看到这个按钮
        </Auth.Button>
      </div>
    ),
  },
};
