import { useAuth } from "../hooks/useAuth";

export function withAuth<Props>(Component: React.ComponentType<Props>) {
  const AuthWrapped = (props: Props) => {
    const [auth, setAuth] = useAuth();
    return <Component {...props} auth={auth} setAuth={setAuth} />;
  };
  return AuthWrapped;
}
