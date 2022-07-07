import theme from "../../theme/theme";

export type IconProps = {
  color?: keyof typeof theme.colors.icon;
  size?: number;
};
