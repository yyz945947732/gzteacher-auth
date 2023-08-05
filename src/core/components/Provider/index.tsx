import { createContext } from "react";

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

type ProviderContext = Omit<ProviderProps, "children">;
export const ProviderContext = createContext<ProviderContext>({});

function Provider(props: ProviderProps) {
  const { children, ...authProps } = props;
  return (
    <ProviderContext.Provider value={authProps}>
      {children}
    </ProviderContext.Provider>
  );
}

export default Provider;
