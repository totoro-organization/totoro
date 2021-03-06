import { Button } from "@mui/material";
import { FormEvent } from "react";
import { FormContainer } from "src/components/forms";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";

  interface DeleteContentProps {
    item: any,
    message: string,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteContent = ({item, handleDelete, handleClose, message}: DeleteContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <FormContainer onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>{ message }</p>
        <ButtonsBox>
            <Button variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Supprimer
            </Button>
          </ButtonsBox>
      </FormContainer>
    );
  };