import "@alifd/next/es/tab/style2";

import { Tab as TabComponent } from "@alifd/next";
import type {
  ItemProps as ItemComponentProps,
  TabProps as TabComponentProps,
} from "@alifd/next/types/tab/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface ItemProps extends ItemComponentProps {
  auth?: string | string[];
}

export interface TabProps extends TabComponentProps {
  tabItems?: ItemProps[];
}

function Tab(prop: TabProps) {
  useDetect(Tab.name);

  const { tabItems, ...otherProps } = prop;
  const authTabItems = useAuthData(tabItems, {
    isTree: false,
  });

  return (
    <TabComponent {...otherProps}>
      {authTabItems?.map((item) => (
        <TabComponent.Item key={item.title} {...item} />
      ))}
    </TabComponent>
  );
}

Tab.Item = TabComponent.Item;

export default Tab;
