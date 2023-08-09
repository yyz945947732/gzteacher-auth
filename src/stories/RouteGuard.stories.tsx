import "@alifd/next/lib/message/style2";

import { Message } from "@alifd/next";
import type { Meta, StoryObj } from "@storybook/react";
import { HashRouter, Link, Route, Routes } from "react-router-dom6";

import { Auth, RouteGuardProps } from "../core";

const meta = {
  title: "Auth.RouteGuard",
  component: Auth.RouteGuard,
  tags: ["autodocs"],
} satisfies Meta<typeof Auth.RouteGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

const authConfig = {
  "page.index": true,
  "page.about": true,
  "page.info": true,
};

const RouteGuardExample = (args: RouteGuardProps) => {
  return (
    <HashRouter>
      <Message type="warning">
        RouteGuard 仅提供路由权限拦截功能，不包含路由功能，且需要确保组件在
        react-router-dom V6 Router 上下文中使用。如果你在使用 ice2.js
        框架，请继续使用原框架路由权限拦截功能。
      </Message>
      <Auth.Provider auth={authConfig}>
        <p>已知您有以下权限: </p>
        <ul>
          {Object.keys(authConfig).map((authCode) => (
            <li key={authCode}>{authCode}</li>
          ))}
        </ul>
        <p>跳转无权限路由时限制访问内容</p>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于我们</Link>
          </li>
          <li>
            <Link to="/info">个人信息</Link>
          </li>
          <li>
            <Link to="/secret">内部机密</Link>
          </li>
        </ul>
        <Auth.RouteGuard {...args}>{args.children}</Auth.RouteGuard>
      </Auth.Provider>
    </HashRouter>
  );
};

export const RouteGuard = RouteGuardExample.bind({}) as Story;
RouteGuard.args = {
  routes: [
    {
      path: "/",
      auth: "page.index",
    },
    {
      path: "/about",
      auth: "page.about",
    },
    {
      path: "/info",
      auth: "page.info",
    },
    {
      path: "/secret",
      auth: "page.secret",
    },
  ],
  children: (
    <Routes>
      <Route path="/" element={<h1>index</h1>} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/info" element={<h1>info</h1>} />
      <Route path="/secret" element={<h1>secret</h1>} />
    </Routes>
  ),
};
