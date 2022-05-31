import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
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
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
      </form>
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
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
      </form>
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
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
      </form>
    );
  };