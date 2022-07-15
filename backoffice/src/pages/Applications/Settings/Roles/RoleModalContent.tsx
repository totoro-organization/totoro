import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { Role } from "src/models";

interface EditRoleContentProps {
    item: Role,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditRoleContent = ({item, handleUpdate, handleClose}: EditRoleContentProps) => {

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
          id="role_label"
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

interface AddRoleContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddRoleContent = ({handleAdd, handleClose}: AddRoleContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="role_label"
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

interface DeleteRoleContentProps {
    item: Role,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteRoleContent = ({item, handleDelete, handleClose}: DeleteRoleContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le role suivant : { item.label }</p>
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