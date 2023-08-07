import Button from "./components/Button";
import Deny from "./components/Deny";
import Provider from "./components/Provider";
import Proxy from "./components/Proxy";
import Select from "./components/Select";
import type { WrapperProps } from "./components/Wrapper";
import Wrapper from "./components/Wrapper";

type AuthProps = WrapperProps;
function Auth(prop: AuthProps) {
  return <Wrapper {...prop} />;
}

Auth.Provider = Provider;
Auth.Proxy = Proxy;
Auth.Wrapper = Wrapper;
Auth.Button = Button;
Auth.Deny = Deny;
Auth.Select = Select;

export { Auth };
export default Auth;
export type { ButtonProps } from "./components/Button";
export type { DenyProps } from "./components/Deny";
export type { ProviderProps } from "./components/Provider";
export type { ProxyProps } from "./components/Proxy";
export type { SelectProps } from "./components/Select";
export type { WrapperProps } from "./components/Wrapper";
export { useAuthData } from "./hooks/useAuthData";
export { useMatchAuth } from "./hooks/useMatchAuth";
