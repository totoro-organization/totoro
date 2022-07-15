import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import type { Log, TableMethods} from "src/models";

  interface DeleteLogContentProps {
    item: Log,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteLogContent = ({item: log, handleDelete, handleClose}: DeleteLogContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(log.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le log suivant : à remplir </p>
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