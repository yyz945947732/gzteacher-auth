import "@alifd/next/es/tab/style2";

import { Tab as TabComponent } from "@alifd/next";
import type {
  ItemProps as ItemComponentProps,
  TabProps as TabComponentProps,
} from "@alifd/next/types/tab/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface ItemProps extends ItemComponentProps {
  /** 权限编号 */
  auth?: string | string[];
  key?: React.Key;
}

export interface TabProps extends TabComponentProps {
  /** 选项卡项目 */
  tabItems?: ItemProps[];
  /** 权限验证字段，默认为 `auth` */
  authKey?: string;
}

function Tab(prop: TabProps) {
  useDetect(Tab.name);

  const { tabItems, authKey, ...otherProps } = prop;
  const authTabItems = useAuthData(tabItems, {
    isTree: false,
    authKey,
  });

  return (
    <TabComponent {...otherProps}>
      {authTabItems?.map((item) => (
        <TabComponent.Item key={item.key} {...item} />
      ))}
    </TabComponent>
  );
}

Tab.Item = TabComponent.Item;

export default Tab;
