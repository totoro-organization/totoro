import { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
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

interface CustomModalProps {
  open: boolean,
  handleClose: () => void,
  callback: ({id, label}: {id: string, label: string}) => any,
  item?: any,
  title: string,
  type?: 'edit' | 'delete' | 'add'
}

const CustomModal = ({
  open,
  handleClose,
  callback,
  item = null,
  title,
  type
}: CustomModalProps) => {
  const [label, setLabel] = useState(item?.label);

  const ButtonsBox = styled(Box)(
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
       
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <ModalBox>
        <h2 id="child-modal-title">{title}</h2>
        {type === 'edit' ? (
          <EditTemplate label={item?.label} setLabel={setLabel} />
        ) : type === 'add' ? (
          <AddTemplate setLabel={setLabel} />
        ) : (
          (type === 'delete' ? <DeleteTemplate item={item} /> : <DefaultTemplate />)
        )}
        <ButtonsBox>
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => callback({id: item?.id, label})}
          >
            { type === 'edit' ? "Editer" : type === 'delete' ? "Supprimer" : type === 'add' ? "Ajouter" : 'Confirmer'}
          </Button>
        </ButtonsBox>
      </ModalBox>
    </Modal>
  );
};

const DefaultTemplate = () => {
  return (
    <p>Default</p>
  );
};

const EditTemplate = ({label, setLabel}) => {
  return (
    <TextField
      required
      id="tag_label"
      label="Label"
      defaultValue={label}
      onChange={(e) => setLabel(e.target.value)}
    />
  );
};

const DeleteTemplate = ({item}) => {
  return (
    <p>Vous allez supprimer { item?.label }</p>
  );
};

const AddTemplate = ({setLabel}) => {
  return (
    <TextField
      required
      id="tag_label"
      label="Label"
      onChange={(e) => setLabel(e.target.value)}
    />
  );
};

export default CustomModal;
