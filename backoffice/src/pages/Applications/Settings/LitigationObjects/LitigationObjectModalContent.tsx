import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { LitigationObject } from "src/models";

interface EditLitigationObjectContentProps {
    item: LitigationObject,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditLitigationObjectContent = ({item, handleUpdate, handleClose}: EditLitigationObjectContentProps) => {

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
          id="litigationObject_label"
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

interface AddLitigationObjectContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddLitigationObjectContent = ({handleAdd, handleClose}: AddLitigationObjectContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="litigationObject_label"
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

interface DeleteLitigationObjectContentProps {
    item: LitigationObject,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteLitigationObjectContent = ({item, handleDelete, handleClose}: DeleteLitigationObjectContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer l'objet suivant : { item.label }</p>
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