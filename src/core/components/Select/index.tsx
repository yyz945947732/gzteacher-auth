import "@alifd/next/es/select/style2";

import { Select as SelectComponent } from "@alifd/next";
import type { SelectProps as SelectComponentProps } from "@alifd/next/types/select/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface SelectProps extends SelectComponentProps {
  /** 权限验证字段，默认为 `auth` */
  authKey?: string;
}

function Select(prop: SelectProps) {
  useDetect(Select.name);

  const { children, dataSource, authKey, ...otherProps } = prop;
  const authData = useAuthData(dataSource, { authKey });

  return (
    <SelectComponent dataSource={authData} {...otherProps}>
      {children}
    </SelectComponent>
  );
}

Select.Option = SelectComponent.Option;
Select.OptionGroup = SelectComponent.OptionGroup;
Select.AutoComplete = SelectComponent.AutoComplete;

export default Select;
