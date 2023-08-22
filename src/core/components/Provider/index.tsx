import { createContext, useEffect, useState } from "react";

interface ProviderValidatorItem {
  /** 匹配项，正则或字符串 */
  match: RegExp | string;
  /** 验证权限逻辑 */
  validate: (
    /** 权限编码 */
    authCode: string,
    /** 权限数据 */
    auth: ProviderProps["auth"]
  ) => boolean;
}

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
   * 自定义权限逻辑验证器
   * @example
   * [
   *    {
   *        match: /(.*)/,
   *        validate: (authCode, auth) => true
   *    }
   * ]
   */
  validator?: ProviderValidatorItem[];
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

  useEffect(() => {
    setAuth(authFromProps);
  }, [authFromProps]);

  return (
    <ProviderContext.Provider
      value={{
        auth,
        setAuth,
        validator,
        disabled,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export default Provider;
