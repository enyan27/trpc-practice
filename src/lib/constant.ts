import { IconDashboard, IconJumpRope } from "@tabler/icons-react";

export const SIDEBAR_MENU_ITEMS = [
  { href: "/", icon: IconDashboard, label: "Dashboard" },
  { href: "/workflows", icon: IconJumpRope, label: "Workflows" }
];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  PAGE_SIZE: 5
};
