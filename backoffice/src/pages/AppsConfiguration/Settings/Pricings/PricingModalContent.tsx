import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
import { Pricing } from "src/models";

interface EditPricingContentProps {
    item: Pricing,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditPricingContent = ({item, handleUpdate, handleClose}: EditPricingContentProps) => {

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
          id="pricing_label"
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

interface AddPricingContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddPricingContent = ({handleAdd, handleClose}: AddPricingContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="pricing_label"
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

interface DeletePricingContentProps {
    item: Pricing,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeletePricingContent = ({item, handleDelete, handleClose}: DeletePricingContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer le pricing suivant : { item.label }</p>
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