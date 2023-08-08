import AuthButton from "./components/Button";
import AuthDenyWrapper from "./components/DenyWrapper";
import AuthProvider from "./components/Provider";
import AuthProxy from "./components/Proxy";
import AuthSelect from "./components/Select";
import AuthTab from "./components/Tab";
import AuthTable from "./components/Table";
import type { WrapperProps } from "./components/Wrapper";
import AuthWrapper from "./components/Wrapper";

type AuthProps = WrapperProps;
function Auth(prop: AuthProps) {
  return <AuthWrapper {...prop} />;
}

Auth.Provider = AuthProvider;
Auth.Proxy = AuthProxy;
Auth.Wrapper = AuthWrapper;
Auth.Button = AuthButton;
Auth.DenyWrapper = AuthDenyWrapper;
Auth.Select = AuthSelect;
Auth.Tab = AuthTab;
Auth.Table = AuthTable;

export {
  Auth,
  AuthButton,
  AuthDenyWrapper,
  AuthProvider,
  AuthProxy,
  AuthSelect,
  AuthTab,
  AuthTable,
  AuthWrapper,
};
export default Auth;
export type { ButtonProps } from "./components/Button";
export type { DenyWrapperProps } from "./components/DenyWrapper";
export type { ProviderProps } from "./components/Provider";
export type { ProxyProps } from "./components/Proxy";
export type { SelectProps } from "./components/Select";
export type { TabProps } from "./components/Tab";
export type { TableProps } from "./components/Table";
export type { WrapperProps } from "./components/Wrapper";
export { useAuthData } from "./hooks/useAuthData";
export { useMatchAuth } from "./hooks/useMatchAuth";
