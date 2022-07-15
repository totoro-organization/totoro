import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { Subscription, TableMethods } from "src/models";

  interface DeleteSubscriptionContentProps {
    item: Subscription,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteSubscriptionContent = ({item: subscription, handleDelete, handleClose}: DeleteSubscriptionContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(subscription.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer la mission suivante : { subscription?.pricing.label }</p>
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