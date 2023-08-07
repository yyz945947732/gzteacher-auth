import "@alifd/next/lib/button/style2";

import { Button as ButtonComponent } from "@alifd/next";
import type { ButtonProps as ButtonComponentProps } from "@alifd/next/types/button/index";
import React from "react";

import { useDetect } from "../../hooks/useDetect";
import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface ButtonProps extends ButtonComponentProps {
  /** 权限编号 */
  authCode?: string | string[];
  /** 按钮内容 */
  children?: React.ReactNode;
}

function Button(prop: ButtonProps) {
  useDetect(Button.name);

  const { authCode, children, ...otherProps } = prop;
  const canEvent = useMatchAuth(authCode);
  return (
    <>
      {canEvent ? (
        <ButtonComponent {...otherProps}>{children}</ButtonComponent>
      ) : (
        children
      )}
    </>
  );
}

export default Button;
