import { Theme } from "./theme";

import "styled-components";

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
