import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { Application } from "src/models";

interface EditApplicationContentProps {
    item: Application,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditApplicationContent = ({item, handleUpdate, handleClose}: EditApplicationContentProps) => {

    const [data, setData] = useState({
        name: item?.name
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="application_name"
          label="Nom"
          defaultValue={item.name}
          onChange={(e) => setData({ name: e.target.value })}
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

interface AddApplicationContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddApplicationContent = ({handleAdd, handleClose}: AddApplicationContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="application_name"
          label="Nom"
          onChange={(e) => setData({ name: e.target.value })}
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

interface DeleteApplicationContentProps {
    item: Application,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteApplicationContent = ({item, handleDelete, handleClose}: DeleteApplicationContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le application suivant : { item.name }</p>
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