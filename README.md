# @gzteacher/auth

> 基于 @alifd/next 的权限相关组件

[在线文档](https://64cca10e002c2d1cef000809-vunqobyuay.chromatic.com/?path=/docs/stories-%E4%BB%8B%E7%BB%8D--docs)

## Install

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
