import { FC } from 'react';
import {
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  TableProps,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

const DiscountsTable: FC<TableProps<any>> = ({
  items: discounts, 
}) => {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Durée</TableCell>
              <TableCell align="left">Coût</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Création</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount) => {
              return (
                <TableRow hover key={discount.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {discount.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {discount.type.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {discount.duration}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {discount.cost}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {discount.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(discount.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default DiscountsTable;
