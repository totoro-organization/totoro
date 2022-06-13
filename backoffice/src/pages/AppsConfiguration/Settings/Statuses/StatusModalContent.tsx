import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
import { Status } from "src/models";

interface EditStatusContentProps {
    item: Status<any>,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditStatusContent = ({item, handleUpdate, handleClose}: EditStatusContentProps) => {

    const [data, setData] = useState({
        label: item?.label
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="status_label"
          label="Label"
          defaultValue={item.label}
          onChange={(e) => setData({ label: e.target.value })}
          />
        <ButtonsBox>
            <Button variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Editer
            </Button>
          </ButtonsBox>
      </Form>
    );
  };

interface AddStatusContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddStatusContent = ({handleAdd, handleClose}: AddStatusContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="status_label"
          label="Label"
          onChange={(e) => setData({ label: e.target.value })}
          />
        <ButtonsBox>
            <Button variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Ajouter
            </Button>
          </ButtonsBox>
      </Form>
    );
  };

interface DeleteStatusContentProps {
    item: Status<any>,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteStatusContent = ({item, handleDelete, handleClose}: DeleteStatusContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le status suivant : { item.label }</p>
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