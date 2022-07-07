import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { Litigation } from "src/models";

  interface DeleteLitigationContentProps {
    item: Litigation,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteLitigationContent = ({item: litigation, handleDelete, handleClose}: DeleteLitigationContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(litigation.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le litige suivant suivant : { litigation?.id }</p>
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