简体中文 | [English](./READEME.zh-en.md)

<p align="center">
  <a href="https://github.com/yyz945947732/gzteacher-auth">
    <img alt="@gzteacher/auth" src="./public/logo.png" width="280" />
  </a>
</p>

# @gzteacher/auth

> 基于 @alifd/next 的权限相关组件

<p align="center">
  <a href="https://www.npmjs.com/package/@gzteacher/auth">
    <img src="https://img.shields.io/npm/v/@gzteacher/auth.svg" alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/@gzteacher/auth">
    <img src="https://img.shields.io/npm/dm/@gzteacher/auth.svg" alt="download" />
  </a>
  <a href="https://coveralls.io/github/yyz945947732/gzteacher-auth?branch=master">
    <img
      src="https://coveralls.io/repos/github/yyz945947732/gzteacher-auth/badge.svg?branch=master"
      alt="Coverage Status"
    />
  </a>
  <a href="https://github.com/yyz945947732/gzteacher-auth/pulls">
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs Welcome"
    />
  </a>
  <a href="/LICENSE">
    <img
      src="https://img.shields.io/badge/license-MIT-blue.svg"
      alt="GitHub license"
    />
  </a>
</p>

[📚 在线文档](https://64cca10e002c2d1cef000809-tsdixediye.chromatic.com/)

## Features

- 🐒 **基本**: 基本的权限逻辑组件
  - _Provider_: 定义权限组件上下文
  - _Wrapper_: 有权限时展示组件内容
  - _DenyWrapper_: 有权限时不展示组件内容
  - _RouteGuard_: 路由权限拦截
- 🐯 **组件**: 对`@alifd/next`的常用组件扩展了基本权限逻辑
  - _Button_: 无权限时展示为文本
  - _Select_: 下拉框不展示无权限的选项
  - _Tab_: 标签页不展示无权限的标签
  - _Table_: 表格不展示无权限的列
  - _Menu_: 菜单不显示无权限的菜单项
  - _Nav_: 导航栏不显示无权限的导航项
- 🤖️ **定制**: 支持自定义权限验证器以实现更丰富的权限功能
  - _Validator_
- 🦁 **代理**: 支持在上下文内将权限编码重定向到其他权限编码
  - _Proxy_
- 🐌 **工具**: 权限业务逻辑相关的工具函数
  - _useAuth_: 返回权限信息和权限更新方法
  - _useMatchAuth_: 返回是否有对应权限
  - _useAuthData_: 根据传入集合返回有权限的集合数据
- 🌲 **树形**: 权限功能支持树形结构
  - _useAuthData_、_Select_、_Table_、_RouteGuard_ 、_Menu_、_Nav_...

## Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install --save @gzteacher/auth
```

Install with [yarn](https://yarnpkg.com/):

```sh
yarn add @gzteacher/auth
```

## Usage

使用 `Auth.Provider` 组件包裹以使用权限相关组件。

```typescript
// index.tsx
import { useState } from "react";
import { Auth } from "@gzteacher/auth";

function Layout() {
  const [auth, setAuth] = useState();

  const getAuth = async () => {
    const auth = await getAuth();
    console.log(auth);
    // {
    //    "user.watch": true,
    //    "user.edit": true,
    // }
    setAuth(auth);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <Auth.Provider auth={auth}>
      <Auth.Wrapper authCode="user.watch">查看</Auth.Wrapper>
      <Auth.Button authCode="user.edit">编辑</Auth.Button>
    </Auth.Provider>
  );
}
```

##### ice2.js 中使用

```typescript
// app.tsx
import { IAppConfig, runApp, useAuth } from "ice";
import { Auth } from "@gzteacher/auth";

const appConfig: IAppConfig = {
  // ...
  app: {
    // ...
    getInitialData: async () => {
      const auth = await getAuth();
      return {
        auth,
      };
    },
    addProvider: ({ children }) => {
      const [auth] = useAuth();
      return <Auth.Provider auth={auth}>{children}</Auth.Provider>;
    },
  },
};

runApp(appConfig);
```

## LICENSE

[MIT](https://github.com/yyz945947732/gzteacher-auth/blob/master/LICENCE.md)
