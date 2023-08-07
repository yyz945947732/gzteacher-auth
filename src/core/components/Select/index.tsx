import "@alifd/next/lib/select/style2";

import { Select as SelectComponent } from "@alifd/next";
import type { SelectProps as SelectComponentProps } from "@alifd/next/types/select/index";

import { useAuthData } from "../../hooks/useAuthData";

export interface SelectProps extends SelectComponentProps {}

function Select(prop: SelectProps) {
  const { children, dataSource, ...otherProps } = prop;
  const authData = useAuthData(dataSource);

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
