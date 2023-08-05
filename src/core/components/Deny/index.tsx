import React from "react";

import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface DenyProps {
  authCode?: string;
  children?: React.ReactNode;
}

const Deny: React.FC<DenyProps> = (prop) => {
  const { authCode, children } = prop;
  const notRender = useMatchAuth(authCode);
  return <>{notRender ? <></> : children}</>;
};

export default Deny;
