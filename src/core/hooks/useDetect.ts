import { useContext } from "react";

import { ProviderContext } from "../components/Provider";
import { has } from "../utils";

/** 检测组件使用是否合法 */
export function useDetect(componentName: string) {
  const context = useContext(ProviderContext);

  /* istanbul ignore if  */
  if (!has(context, "auth")) {
    console.warn(
      `检测到 Auth.Provider 组件未提供 auth 属性，请检查是否在 Auth.Provider 组件外部使用了 Auth.${componentName} 组件或是 Auth.Provider 未添加 auth 属性。`
    );
  }
}
