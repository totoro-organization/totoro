import { styled, Tabs } from "@mui/material";

const TabsWrapper = styled(Tabs)(
    () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `
  );

export default TabsWrapper