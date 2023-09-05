import { createContext, useState } from "react";

import { useDeepCompareEffect } from "../../hooks/useDeepCompareEffect";
import type { ValidatorProps } from "../../index";
import { AuthValidator } from "../../index";

export interface ProviderProps {
  /** 内容 */
  children?: React.ReactNode;
  /** 权限
   * @example
   * {
   *    "user.add": true,
   *    "user.edit": true,
   * }
   * // or
   * ["user.add", "user.edit"]
   * // or
   * "user.add,user.edit"
   */
  auth?: Record<string, boolean> | string[] | string;
  /**
   * 自定义全局权限逻辑验证器，相当于全局生效的 Validator 组件。
   * @example
   * [
   *    {
   *        match: /(.*)/,
   *        validate: (authCode, auth) => true
   *    }
   * ]
   */
  validator?: ValidatorProps["validator"];
  /** 是否关闭权限限制，默认 `false` */
  disabled?: boolean;
}

interface ProviderContext extends Omit<ProviderProps, "children"> {
  /** 更新权限 */
  setAuth: React.Dispatch<React.SetStateAction<ProviderProps["auth"]>>;
}
export const ProviderContext = createContext<ProviderContext>({
  setAuth: () => {},
});

function Provider(props: ProviderProps) {
  const { children, auth: authFromProps, validator, disabled = false } = props;

  const [auth, setAuth] = useState(authFromProps);

  useDeepCompareEffect(() => {
    setAuth(authFromProps);
  }, [authFromProps]);

  return (
    <ProviderContext.Provider
      value={{
        auth,
        setAuth,
        disabled,
      }}
    >
      <AuthValidator validator={validator}>{children}</AuthValidator>
    </ProviderContext.Provider>
  );
}

export default Provider;
