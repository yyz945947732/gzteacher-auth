[简体中文](./README.md) | English

<p align="center">
  <a href="https://github.com/yyz945947732/gzteacher-auth">
    <img alt="@gzteacher/auth" src="./public/logo.png" width="280" />
  </a>
</p>

# @gzteacher/auth

> Permission related components based on @alifd/next

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

[📚 Doc](https://64cca10e002c2d1cef000809-ywnirvkurr.chromatic.com/)

## Features

- 🐒 **Basic**: Basic permission logic components
  - _Provider_: Define permission component context
  - _Wrapper_: Display component content when permission is granted
  - _DenyWrapper_: Do not display component content when permission is granted
  - _RouteGuard_: Routing permission interception
- 🐯 **Components**: Extended basic permission logic for commonly used components of `@alifd/next`
  - _Button_: Show as text when no permission
  - _Select_: Select do not display unprivileged options
  - _Tab_: Tab do not display unprivileged items
  - _Table_: Tables do not display unprivileged columns
  - _Menu_: Menu do not display unprivileged items
  - _Nav_: Nav do not display unprivileged items
- 🤖️ **Customization**: Support custom Validator to achieve richer permission ability
  - _Validator_
- 🦁 **Proxy**: Support for redirecting permission codes to other permission codes within context
  - _Proxy_
- 🐌 **Tool**: Utility functions related to permission business logic
  - _useAuth_: Get permission information and permission update method
  - _useMatchAuth_: Check whether there is a corresponding permission
  - _useAuthData_: Get authorized collection data based on the input collection
- 🌲 **Tree Shape**: Permission functions and components support tree structure
  - _useAuthData_、_Select_、_Table_、_RouteGuard_ 、_Menu_、_Nav_ etc.

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

Wrap with `Auth.Provider` component to use.

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
      <Auth.Wrapper authCode="user.watch">Watch</Auth.Wrapper>
      <Auth.Button authCode="user.edit">Edit</Auth.Button>
    </Auth.Provider>
  );
}
```

##### use in ice2.js

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
