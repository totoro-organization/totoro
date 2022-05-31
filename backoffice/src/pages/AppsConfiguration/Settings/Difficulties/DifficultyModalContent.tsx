import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { ButtonsBox } from "src/components/Modal";
import { TableMethods } from "src/hooks/useTable";
import { JobDifficulty } from "src/models";

interface EditDifficultyContentProps {
    item: JobDifficulty,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditDifficultyContent = ({item, handleUpdate, handleClose}: EditDifficultyContentProps) => {

    const [data, setData] = useState({
        level: item?.level as number,
        token: item?.token as number
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <TextField
          required
          id="difficulty_level"
          label="Level"
          type="number"
          defaultValue={item.level}
          onChange={(e) => setData({...data, level: Number(e.target.value) })}
          />
          <TextField
          required
          id="difficulty_label"
          label="Tokens rapportés"
          type="number"
          defaultValue={item.token}
          onChange={(e) => setData({...data, token: Number(e.target.value) })}
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

interface AddDifficultyContentProps {
    handleAdd: TableMethods["handleAddItem"],
    handleClose: () => void
}

export const AddDifficultyContent = ({handleAdd, handleClose}: AddDifficultyContentProps) => {

    const [data, setData] = useState({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAdd(data);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
           <TextField
          required
          id="difficulty_level"
          label="Level"
          type="number"
          onChange={(e) => setData({ level: e.target.value })}
          />
          <TextField
          required
          id="difficulty_label"
          label="Tokens rapportés"
          type="number"
          onChange={(e) => setData({ token: e.target.value })}
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

interface DeleteDifficultyContentProps {
    item: JobDifficulty,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteDifficultyContent = ({item, handleDelete, handleClose}: DeleteDifficultyContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(item.id);
    }
  
    return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer la difficulté suivante : { item.level }</p>
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