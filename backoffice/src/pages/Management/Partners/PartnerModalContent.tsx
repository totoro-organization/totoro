import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
import { Partner } from "src/models";

  interface DeletePartnerContentProps {
    item: Partner,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeletePartnerContent = ({item: partner, handleDelete, handleClose}: DeletePartnerContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(partner.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le partenaire suivant : { partner?.name }</p>
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