import React from "react";

import { useDetect } from "../../hooks/useDetect";
import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface DenyWrapperProps {
  /** 权限编号 */
  authCode?: string | string[];
  /** 内容 */
  children?: React.ReactNode;
}

function DenyWrapper(props: DenyWrapperProps) {
  useDetect(DenyWrapper.name);

  const { authCode, children } = props;
  const notRender = useMatchAuth(authCode);
  if (notRender) {
    return <></>;
  }
  return <>{children}</>;
}

export default DenyWrapper;
