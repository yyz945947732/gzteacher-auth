import "@alifd/next/es/button/style2";

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

  const { authCode, children, ...buttonProps } = prop;
  const canEvent = useMatchAuth(authCode);
  if (!canEvent) {
    return <>{children}</>;
  }
  return <ButtonComponent {...buttonProps}>{children}</ButtonComponent>;
}

Button.Group = ButtonComponent.Group;

export default Button;
