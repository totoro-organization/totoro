import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/models";
import { Pricing } from "src/models";

interface EditPricingContentProps {
    item: Pricing,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditPricingContent = ({item, handleUpdate, handleClose}: EditPricingContentProps) => {

    const [data, setData] = useState({
        label: item?.label,
        price: item?.price,
        description: item?.description,
        duration: item?.duration,
        nb_account: item?.nb_account,
        nb_jobs_by_month: item?.nb_jobs_by_month
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="pricing_label"
          label="Label"
          defaultValue={item.label}
          onChange={(e) => setData({...data, label: e.target.value })}
          />
          <TextField
          required
          id="pricing_price"
          label="Tarif"
          type="number"
          defaultValue={item.price}
          onChange={(e) => setData({...data, price: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_duration"
          label="Durée"
          type="number"
          defaultValue={item.duration}
          onChange={(e) => setData({...data, duration: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_nb_account"
          label="Nb de comptes"
          type="number"
          defaultValue={item.nb_account}
          onChange={(e) => setData({...data, nb_account: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_nb_jobs_by_month"
          label="Nb de missions/mois"
          type="number"
          defaultValue={item.nb_jobs_by_month}
          onChange={(e) => setData({...data, nb_jobs_by_month: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_description"
          label="Nb de missions/mois"
          multiline
          defaultValue={item.description}
          onChange={(e) => setData({...data, description: e.target.value })}
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
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="pricing_label"
          label="Label"
          onChange={(e) => setData({...data, label: e.target.value })}
          />
          <TextField
          required
          id="pricing_price"
          label="Tarif"
          type="number"
          onChange={(e) => setData({...data, price: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_duration"
          label="Durée"
          type="number"
          onChange={(e) => setData({...data, duration: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_nb_account"
          label="Nb de comptes"
          type="number"
          onChange={(e) => setData({...data, nb_account: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_nb_jobs_by_month"
          label="Nb de missions/mois"
          type="number"
          onChange={(e) => setData({...data, nb_jobs_by_month: Number(e.target.value) })}
          />
          <TextField
          required
          id="pricing_description"
          label="Nb de missions/mois"
          multiline
          onChange={(e) => setData({...data, description: e.target.value })}
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
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
      </Form>
    );
  };