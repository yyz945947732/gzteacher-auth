import React from "react";

import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface DenyProps {
  authCode?: string;
  children?: React.ReactNode;
}

function Deny(props: DenyProps) {
  const { authCode, children } = props;
  const notRender = useMatchAuth(authCode);
  return <>{notRender ? <></> : children}</>;
}

export default Deny;
