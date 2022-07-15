import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { Organization } from "src/models";

  interface DeleteOrganizationContentProps {
    item: Organization,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteOrganizationContent = ({item: organization, handleDelete, handleClose}: DeleteOrganizationContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(organization.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer l'association suivante: { organization?.name }</p>
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