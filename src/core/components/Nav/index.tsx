import "@alifd/next/es/nav/style2";

import { Nav as NavComponent } from "@alifd/next";
import type {
  GroupProps as GroupPropsComponentProps,
  ItemProps as ItemComponentProps,
  NavProps as NavComponentProps,
  SubNavProps as SubNavComponentProps,
} from "@alifd/next/types/nav/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface NavItemProps
  extends Omit<ItemComponentProps, "children">,
    Omit<GroupPropsComponentProps, "children">,
    Omit<SubNavComponentProps, "children"> {
  label?: React.ReactNode;
  itemType?: "item" | "subNav" | "group";
  auth?: string | string[];
  key?: React.Key;
  children?: NavItemProps[];
}

export interface NavProps extends NavComponentProps {
  /** 导航项 */
  navItems?: NavItemProps[];
  /** 权限验证字段，默认为 `auth` */
  authKey?: string;
}

function renderTree(navs: NavItemProps) {
  if (navs.itemType === "group") {
    return (
      <NavComponent.Group {...navs}>
        {navs?.children?.map((item) => renderTree(item))}
      </NavComponent.Group>
    );
  }
  if (navs.itemType === "subNav" || navs.children) {
    return (
      <NavComponent.SubNav {...navs}>
        {navs?.children?.map((item) => renderTree(item))}
      </NavComponent.SubNav>
    );
  }
  return <NavComponent.Item {...navs}>{navs.label}</NavComponent.Item>;
}

function Nav(prop: NavProps) {
  useDetect(Nav.name);

  const { navItems, authKey, ...otherProps } = prop;
  const authItems = useAuthData(navItems, { authKey });

  return (
    <NavComponent {...otherProps}>
      {authItems?.map((item) => renderTree(item))}
    </NavComponent>
  );
}

Nav.Group = NavComponent.Group;
Nav.Item = NavComponent.Item;
Nav.PopupItem = NavComponent.PopupItem;
Nav.SubNav = NavComponent.SubNav;

export default Nav;
