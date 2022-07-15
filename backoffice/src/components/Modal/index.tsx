import { ReactNode } from 'react';
import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

const ModalBox = styled(Box)(
  ({ theme }) => `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing(4)};
        width: 100%;
        max-width: 500px;
        background-color: ${theme.colors.alpha.trueWhite[100]};
        border-radius: ${theme.general.borderRadiusSm};
        box-shadow: 24;
        padding: ${theme.spacing(3)};
    `
);

 export const ButtonsBox = styled(Box)(
    ({ theme }) => `
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        @media(min-width: 580px) {
          flex-direction: row;
          row-gap: 0;
          column-gap: ${theme.spacing(2)};
          justify-content: flex-end;
        }
    `
  );

interface CustomModalProps {
  open: boolean,
  handleClose: () => void,
  title: string,
  children?: ReactNode
}

const CustomModal = ({
  open,
  handleClose,
  title,
  children
}: CustomModalProps) => {
       
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <ModalBox>
        <h2 id="child-modal-title">{title}</h2>
        { children }
      </ModalBox>
    </Modal>
  );
};

export default CustomModal;
