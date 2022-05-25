import { Stack, Button } from '@mui/material';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { Admin } from 'src/models/admin';
import { Log } from 'src/models/Log';
import AdminLogsTable from './AdminLogsTable';

interface AdminInfoProps {
  admin: Admin;
  logs: Log[];
}

const AdminInfo = ({ admin, logs }: AdminInfoProps) => {
  return (
    <>
      {admin ? (
        <>
          <p>Nom : {admin.lastname}</p>
          <p>Prenom : {admin.firstname}</p>
          <p>Username : {admin.username}</p>
          <p>Email : {admin.email}</p>
          <p>Email : {admin.email}</p>
          <p>Créé le : {admin.createdAt}</p>
          <p>Modifié le : {admin.updatedAt}</p>
          <p>Statut : {admin.status.label}</p>
        </>
      ) : (
        <SuspenseLoader />
      )}
      {logs ? (
        logs.length ? <AdminLogsTable logs={logs} /> : <h3>Aucun log</h3>
      ) : (
        <SuspenseLoader />
      )}
    </>
  );
};

export default AdminInfo;
