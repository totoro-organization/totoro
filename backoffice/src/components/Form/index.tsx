import { styled } from "@mui/material/styles";

export const Form = styled('form')(
    ({ theme }) => `
          display: flex;
          flex-direction: column;
          row-gap: ${theme.spacing(3)};
          width: 100%;
      `
  );