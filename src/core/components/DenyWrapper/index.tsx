import React from "react";

import { useDetect } from "../../hooks/useDetect";
import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface DenyWrapperProps {
  authCode?: string;
  children?: React.ReactNode;
}

function DenyWrapper(props: DenyWrapperProps) {
  useDetect(DenyWrapper.name);

  const { authCode, children } = props;
  const notRender = useMatchAuth(authCode);
  return <>{notRender ? <></> : children}</>;
}

export default DenyWrapper;
