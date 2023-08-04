import { Button as ButtonComponent } from "@alifd/next";
import { ButtonProps as ButtonComponentProps } from "@alifd/next/types/button/index";
import React from "react";

import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface ButtonProps extends ButtonComponentProps {
  /** 权限编号 */
  authCode?: string | string[];
  /** 按钮内容 */
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (prop) => {
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
};

export default Button;
