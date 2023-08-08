# @gzteacher/auth

> 基于 @alifd/next 的权限相关组件

<p>
  <a href="https://github.com/yyz945947732/gzteacher-auth/pulls">
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs Welcome"
    />
  </a>
</p>

[📚 在线文档](https://64cca10e002c2d1cef000809-salbxnweky.chromatic.com/)

## Features

- 🐒 **基本**: 基本的权限逻辑组件
  - _Provider_: 定义权限组件上下文
  - _Wrapper_: 有权限时展示组件内容
  - _DenyWrapper_: 有权限时不展示组件内容
- 🐯 **组件**: 对`@alifd/next`的常用组件扩展了基本权限逻辑
  - _Button_: 无权限时展示为文本
  - _Select_: 下拉框不展示无权限的选项
  - _Tab_: 标签页不展示无权限的标签
  - _Table_: 表格不展示无权限的列
- 🦁 **代理**: 支持在上下文内将权限编码重定向到其他权限编码
  - _Proxy_
- 🐌 **工具**: 权限业务逻辑相关的工具函数
  - _useAuth_: 返回权限信息和权限更新方法
  - _useMatchAuth_: 返回是否有对应权限
  - _useAuthData_: 返回有权限的集合数据
- 🌲 **树形**: 权限功能支持树形结构
  - _useAuthData_、_Select_、_Table_ ...

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
  app: {
    // ...
    addProvider: ({ children }) => {
      const [auth] = useAuth();
      return <Auth.Provider auth={auth}>{children}</Auth.Provider>;
    },
  },
};

runApp(appConfig);
```
