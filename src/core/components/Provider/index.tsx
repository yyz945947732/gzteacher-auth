import { createContext, useEffect, useState } from "react";

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
  const { children, auth: authFromProps, disabled = false } = props;

  const [auth, setAuth] = useState(authFromProps);

  useEffect(() => {
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
      {children}
    </ProviderContext.Provider>
  );
}

export default Provider;
