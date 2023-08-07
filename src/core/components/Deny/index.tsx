import React from "react";

import { useDetect } from "../../hooks/useDetect";
import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface DenyProps {
  authCode?: string;
  children?: React.ReactNode;
}

function Deny(props: DenyProps) {
  useDetect(Deny.name);

  const { authCode, children } = props;
  const notRender = useMatchAuth(authCode);
  return <>{notRender ? <></> : children}</>;
}

export default Deny;
