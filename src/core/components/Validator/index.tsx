import { createContext } from "react";

import { useDetect } from "../../hooks/useDetect";

interface ProviderValidatorItem {
  /** 匹配项，正则或字符串 */
  match: RegExp | string;
  /** 验证权限逻辑 */
  validate: (
    /** 权限编码 */
    authCode: string,
    /** 权限数据 */
    auth: any
  ) => boolean;
}

export interface ValidatorProps {
  /** 内容 */
  children?: React.ReactNode;
  /**
   * 自定义权限逻辑验证器
   * @example
   * [
   *    {
   *        match: /(.*)/,
   *        validate: (authCode, auth) => true
   *    }
   * ]
   */
  validator?: ProviderValidatorItem[];
}

type ValidatorContext = Omit<ValidatorProps, "children">;
export const ValidatorContext = createContext<ValidatorContext>({});

function Validator(props: ValidatorProps) {
  useDetect(Validator.name);

  const { children, ...validator } = props;
  return (
    <ValidatorContext.Provider value={validator}>
      {children}
    </ValidatorContext.Provider>
  );
}

export default Validator;
