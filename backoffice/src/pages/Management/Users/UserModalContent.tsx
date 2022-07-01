import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { User } from "src/models";

  interface DeleteUserContentProps {
    item: User,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteUserContent = ({item: user, handleDelete, handleClose}: DeleteUserContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(user.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer l'useristrateur suivant : { user?.firstname + ' ' + user?.lastname }</p>
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
      </Form>
    );
  };