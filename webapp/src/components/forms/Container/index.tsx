import { styled } from '@mui/material/styles';
import { FormEvent } from 'react';

interface IFormContainer {
  onSubmit?: (e: FormEvent) => void;
  children?: JSX.Element[];
}

const Form = styled('form')(
  ({ theme }) => `
          display: flex;
          flex-direction: column;
          row-gap: ${theme.spacing(3)};
          width: 100%;
      `
);

const FormContainer = ({ children, onSubmit }: IFormContainer) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return <Form onSubmit={handleSubmit}>{children}</Form>;
};

export default FormContainer;
