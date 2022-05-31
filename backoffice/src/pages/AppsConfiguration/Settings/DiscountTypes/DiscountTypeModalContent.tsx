import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
import { DiscountType } from "src/models";

interface EditDiscountTypeContentProps {
    item: DiscountType,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditDiscountTypeContent = ({item, handleUpdate, handleClose}: EditDiscountTypeContentProps) => {

    const [data, setData] = useState({
        name: item?.name
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="discountType_name"
          name="Label"
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
      </form>
    );
  };

interface AddDiscountTypeContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddDiscountTypeContent = ({handleAdd, handleClose}: AddDiscountTypeContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="discountType_name"
          name="Label"
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
      </form>
    );
  };

interface DeleteDiscountTypeContentProps {
    item: DiscountType,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteDiscountTypeContent = ({item, handleDelete, handleClose}: DeleteDiscountTypeContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le discountType suivant : { item.name }</p>
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