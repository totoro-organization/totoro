import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableProps,
} from '@mui/material';
import ParticipantListItem from './subComponents/ParticipantListItem';

function ParticipantsTable({items}: TableProps<any>) {
  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="left">Prénom</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              return (
                <ParticipantListItem
                  key={item.id}
                  user={item}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ParticipantsTable;
