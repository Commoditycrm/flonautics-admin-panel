import type { ThemeConfig } from "antd";

// Central design tokens. cssVar exposes these as CSS variables so Tailwind
// utilities and AntD components draw from the same palette.
export const theme: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: "#5b57e0",
    colorInfo: "#5b57e0",
    colorSuccess: "#16a34a",
    colorWarning: "#d97706",
    colorError: "#e5484d",

    colorTextBase: "#18181b",
    colorText: "#27272a",
    colorTextSecondary: "#52525b",
    colorTextTertiary: "#a1a1aa",

    colorBgBase: "#ffffff",
    colorBgLayout: "#f7f8fa",
    colorBorder: "#e8e8ec",
    colorBorderSecondary: "#f0f0f3",

    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    controlHeight: 38,
    fontSize: 14,
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

    boxShadow:
      "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
    boxShadowSecondary:
      "0 8px 24px rgba(16,24,40,0.08), 0 2px 6px rgba(16,24,40,0.04)",
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: "#ffffff",
      siderBg: "#ffffff",
      bodyBg: "#f7f8fa",
    },
    Menu: {
      itemHeight: 40,
      itemBorderRadius: 8,
      itemMarginInline: 0,
      itemMarginBlock: 2,
      itemPaddingInline: 12,
      itemSelectedBg: "#eeeefb",
      itemSelectedColor: "#4f46e5",
      itemColor: "#52525b",
      itemHoverBg: "#f4f4f5",
      itemHoverColor: "#18181b",
      iconSize: 18,
      iconMarginInlineEnd: 12,
      activeBarWidth: 0,
      activeBarBorderWidth: 0,
    },
    Table: {
      headerBg: "#fafafa",
      headerColor: "#71717a",
      headerSplitColor: "transparent",
      borderColor: "#f0f0f3",
      rowHoverBg: "#f8f8fd",
      cellPaddingBlock: 14,
      cellPaddingInline: 16,
      fontSize: 14,
      headerBorderRadius: 12,
    },
    Card: {
      borderRadiusLG: 14,
      colorBorderSecondary: "#e8e8ec",
      paddingLG: 20,
    },
    Button: {
      controlHeight: 38,
      controlHeightSM: 30,
      borderRadius: 8,
      fontWeight: 500,
      primaryShadow: "0 1px 2px rgba(91,87,224,0.24)",
      defaultShadow: "none",
    },
    Input: {
      controlHeight: 38,
      borderRadius: 8,
      activeShadow: "0 0 0 3px rgba(91,87,224,0.12)",
    },
    Select: {
      controlHeight: 38,
      borderRadius: 8,
    },
    Modal: {
      borderRadiusLG: 16,
      titleFontSize: 18,
    },
    Popover: {
      borderRadiusLG: 12,
    },
    Tabs: {
      titleFontSize: 14,
      inkBarColor: "#5b57e0",
      itemSelectedColor: "#18181b",
      itemColor: "#71717a",
    },
    Tag: {
      borderRadiusSM: 6,
    },
  },
};
