import { Button, Select, MenuItem } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { useApi } from "src/hooks/useApi";
import { TableMethods } from "src/hooks/useTable";
import { Admin, CommonsUriEnum, Role } from "src/models";

interface EditAdminContentProps {
    item: Admin,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditAdminContent = ({item, handleUpdate, handleClose}: EditAdminContentProps) => {

    const { data: roles, loading  } = useApi(`/${CommonsUriEnum.roles}`);
    
    const [data, setData] = useState({
        role_id: item?.role.id
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }
    
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <Select
          id="admin_role"
          value=""
          label="Modifier le Rôle"
          required
          onChange={(e) => setData({ role_id: e.target.value })}
        >
            {
                roles?.data.map((role: Role) => <MenuItem key={role.id} value={role.id}>{role.label}</MenuItem>)
            }
          
        </Select>
        <ButtonsBox>
            <Button variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="contained"
              disabled={loading}
              type="submit"
            >
              Editer
            </Button>
          </ButtonsBox>
      </Form>
    );
  };

  interface DeleteAdminContentProps {
    item: Admin,
    handleDelete: TableMethods["handleDeleteItem"],
    handleClose: () => void
}

export const DeleteAdminContent = ({item: admin, handleDelete, handleClose}: DeleteAdminContentProps) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDelete(admin.id);
    }
  
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <p>Vous allez supprimer l'administrateur suivant : { admin?.firstname + ' ' + admin?.lastname }</p>
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