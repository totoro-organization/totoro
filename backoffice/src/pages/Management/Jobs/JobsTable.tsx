// @ts-nocheck
import { FC, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import {
  Tooltip,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import StatusLabel from 'src/components/StatusLabel';
import { Job } from 'src/models/job';

interface JobsTableProps {
  items: Job[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any
}

const JobsTable: FC<JobsTableProps> = ({
  items: jobs, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems
}) => {
  const theme = useTheme();

  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeItems}
                  onChange={handleSelectAllItems}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell align="right">Tokens</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => {
              const isJobSelected = selectedItems.includes(
                job.id
              );
              return (
                <TableRow
                  hover
                  key={job.id}
                  selected={isJobSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isJobSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneJob(event, job.id)
                      }
                      value={isJobSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    ><Link to={`/gestion/missions/${job.id}`}>{job.title}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {job.organization}
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
                      {format(job.date, 'dd MMMM  yyyy')}
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
                      {job.participants} / {job.capacity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {job.tokens}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={job.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer la mission" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default JobsTable;
