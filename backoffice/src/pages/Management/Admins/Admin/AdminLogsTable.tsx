// @ts-nocheck
import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import { Log } from 'src/models/log';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';

interface AdminLogsTableProps {
  className?: string;
  logs: Log[];
}

const applyPagination = (
  logs: Log[],
  page: number,
  limit: number
): Log[] => {
  return logs.slice(page * limit, page * limit + limit);
};

const AdminLogsTable: FC<AdminLogsTableProps> = ({ logs }) => {
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const selectedBulkActions = selectedLogs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllLogs = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedLogs(event.target.checked ? logs.map((log) => log.id) : []);
  };

  const handleSelectOneLog = (
    event: ChangeEvent<HTMLInputElement>,
    logId: string
  ): void => {
    if (!selectedLogs.includes(logId)) {
      setSelectedLogs((prevSelected) => [...prevSelected, logId]);
    } else {
      setSelectedLogs((prevSelected) =>
        prevSelected.filter((id) => id !== logId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
 
  const paginatedLogs = applyPagination(logs, page, limit);
  const selectedSomeLogs =
    selectedLogs.length > 0 && selectedLogs.length < logs.length;
  const selectedAllLogs = selectedLogs.length === logs.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllLogs}
                  indeterminate={selectedSomeLogs}
                  onChange={handleSelectAllLogs}
                />
              </TableCell>
              <TableCell align="left">Table</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => {
              const isLogSelected = selectedLogs.includes(log.id);
              return (
                <TableRow hover key={log.id} selected={isLogSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLogSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneLog(event, log.id)
                      }
                      value={isLogSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {log.table}
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
                      {log.action}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {format(log.createdAt, 'dd MMMM  yyyy')}
                  </TableCell>
                  <TableCell align="right">
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
      <Box p={2}>
        <TablePagination
          component="div"
          count={logs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

AdminLogsTable.propTypes = {
  logs: PropTypes.array.isRequired
};

AdminLogsTable.defaultProps = {
  logs: []
};

export default AdminLogsTable;
