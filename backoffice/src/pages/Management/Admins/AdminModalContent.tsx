import { Button, Select, MenuItem } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Form } from "src/components/Form";
import { ButtonsBox } from "src/components/Modal";
import { useApi } from "src/hooks/useApi";
import { TableMethods } from "src/models";
import { Admin, Role } from "src/models";
import { API_ROUTES } from "src/services/routes";

interface EditAdminContentProps {
    item: Admin,
    handleUpdate: TableMethods["handleUpdateItem"],
    handleClose: () => void
}

export const EditAdminContent = ({item, handleUpdate, handleClose}: EditAdminContentProps) => {

    const { data: roles, loading  } = useApi(API_ROUTES.ROLES);
    
    const [data, setData] = useState({
        role_id: item?.role.id
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdate(item.id, data);
    }

    const handleChange = (value) => {
      const role = roles?.data.find(role => role.label === value);
      setData({ role_id: role.id });
    }
    
    return (
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <Select
          label="Modifier le Rôle"
          id="admin_role"
          defaultValue={item?.role.label}
          
          required
          onChange={(e) => handleChange(e.target.value)}
        >
            {
                roles?.data.map((role: Role) => <MenuItem key={role.id} value={role.label}>{role.label}</MenuItem>)
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