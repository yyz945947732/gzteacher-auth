import { createContext, useEffect, useState } from "react";

export interface ProviderProps {
  children?: React.ReactNode;
  /** 权限
   * @example
   * {
   *    "user.add": true,
   *    "user.edit": true,
   * }
   */
  auth?: Record<string, boolean>;
}

interface ProviderContext extends Omit<ProviderProps, "children"> {
  /** 更新权限 */
  setAuth: (auth: ProviderProps["auth"]) => void;
}
export const ProviderContext = createContext<ProviderContext>({
  setAuth: () => {},
});

function Provider(props: ProviderProps) {
  const { children, auth: authFromProps } = props;

  const [auth, setAuth] = useState(authFromProps);

  useEffect(() => {
    setAuth(authFromProps);
  }, [authFromProps]);

  return (
    <ProviderContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export default Provider;
