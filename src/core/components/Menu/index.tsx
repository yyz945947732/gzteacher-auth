import "@alifd/next/es/menu/style2";

import { Menu as MenuComponent } from "@alifd/next";
import type {
  GroupProps as GroupPropsComponentProps,
  ItemProps as ItemComponentProps,
  MenuProps as MenuComponentProps,
  SubMenuProps as SubMenuComponentProps,
} from "@alifd/next/types/menu/index";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface MenuItemProps
  extends Omit<ItemComponentProps, "children">,
    Omit<GroupPropsComponentProps, "children">,
    Omit<SubMenuComponentProps, "children"> {
  label?: React.ReactNode;
  type?: "item" | "subMenu" | "group";
  auth?: string | string[];
  key?: React.Key;
  children?: MenuItemProps[];
}

export interface MenuProps extends MenuComponentProps {
  menuItems?: MenuItemProps[];
}

function renderTree(menus: MenuItemProps) {
  if (menus.type === "group") {
    return (
      <MenuComponent.Group {...menus}>
        {menus?.children?.map((item) => renderTree(item))}
      </MenuComponent.Group>
    );
  }
  if (menus.type === "subMenu" || menus.children) {
    return (
      <MenuComponent.SubMenu {...menus}>
        {menus?.children?.map((item) => renderTree(item))}
      </MenuComponent.SubMenu>
    );
  }
  return <MenuComponent.Item {...menus}>{menus.label}</MenuComponent.Item>;
}

function Menu(prop: MenuProps) {
  useDetect(Menu.name);

  const { menuItems, ...otherProps } = prop;
  const authItems = useAuthData(menuItems);

  return (
    <MenuComponent {...otherProps}>
      {authItems?.map((item) => renderTree(item))}
    </MenuComponent>
  );
}

Menu.SubMenu = MenuComponent.SubMenu;
Menu.Group = MenuComponent.Group;
Menu.Divider = MenuComponent.Divider;
Menu.Item = MenuComponent.Item;
Menu.CheckboxItem = MenuComponent.CheckboxItem;
Menu.PopupItem = MenuComponent.PopupItem;
Menu.RadioItem = MenuComponent.RadioItem;

export default Menu;
