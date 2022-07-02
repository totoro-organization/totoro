import React, { FC } from 'react';

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer
} from '@mui/material';

import { Job } from 'src/models';
import { TableProps } from 'src/components/TableWrapper';
import { useModal } from 'src/hooks/useModal';

import DeleteJobModal from './subComponents/DeleteJobModal';
import JobTableItem from './subComponents/JobTableItem';

const JobsTable: FC<TableProps<Job>> = ({
  items: jobs,
  selectedItems,
  handleSelectAllItems,
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleDeleteItem
}) => {
  const [
    deleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    deleteModalItem
  ] = useModal();

  const handleDeleteJob = (id: string) => {
    handleDeleteItem(id);
    handleCloseDeleteModal();
  };

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
            const isSelectedJob = selectedItems.includes(job.id);

            return (
              <JobTableItem
                job={job}
                isSelectedJob={isSelectedJob}
                handleCheckboxChange={(
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  handleSelectOneItem(e, job.id);
                }}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            );
          })}
        </TableBody>
      </Table>

      {jobs.length && (
        <DeleteJobModal
          modalOpen={deleteModalOpen}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteModalItem={deleteModalItem}
          handleDeleteItem={handleDeleteJob}
        />
      )}
    </TableContainer>
  );
};

export default JobsTable;
