import { styled } from "@mui/material/styles";

const FormContainer = styled('form')(
    ({ theme }) => `
          display: flex;
          flex-direction: column;
          row-gap: ${theme.spacing(3)};
          width: 100%;
      `
  );

export default FormContainer