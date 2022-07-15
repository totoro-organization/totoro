import React from 'react';
import { Link } from 'react-router-dom';

import {
  Tooltip,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Job } from '../../../../../../../models';

<<<<<<< HEAD
import format from 'date-fns/format';
import StatusLabel from '../../../../../../../components/StatusLabel';
=======
import StatusLabel from '../../../../../../../components/StatusLabel';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
>>>>>>> webapp

interface JobTableItemProps {
  job: Job;
  isSelectedJob: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenDeleteModal: (item: Job) => void;
}

export default function JobTableItem({
  job,
  isSelectedJob,
  handleCheckboxChange,
  handleOpenDeleteModal
}: JobTableItemProps) {
  const theme = useTheme();

  return (
<<<<<<< HEAD
    <TableRow hover key={job.id} selected={isSelectedJob}>
=======
    <TableRow hover key={job?.id} selected={isSelectedJob}>
>>>>>>> webapp
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isSelectedJob}
          onChange={handleCheckboxChange}
          value={isSelectedJob}
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
<<<<<<< HEAD
          <Link to={`/gestion/missions/${job.id}`}>{job.title}</Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {job.author.organization
            ? job.author.organization.name
            : `${job.author.user.firstname} ${job.author.user.lastname} (${job.author.user.username})`}
=======
          <Link to={`/association/gestion/missions/${job?.id}`}>{job?.title}</Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {job?.author.organization
            ? job?.author.organization.name
            : `${job?.author.user.firstname} ${job?.author.user.lastname} (${job?.author.user.username})`}
>>>>>>> webapp
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
<<<<<<< HEAD
          {format(new Date(job.createdAt), 'dd/MM/yyyy HH:mm:ss')}
=======
          {getFormatLocalDate(job?.createdAt)}
>>>>>>> webapp
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
<<<<<<< HEAD
          {job.participants_max - job.remaining_place} / {job.participants_max}
=======
          {job?.participants_max - job?.remaining_place} /{' '}
          {job?.participants_max}
>>>>>>> webapp
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
<<<<<<< HEAD
          {job.difficulty.token}
=======
          {job?.difficulty.token}
>>>>>>> webapp
        </Typography>
      </TableCell>

      <TableCell align="right">
        <StatusLabel status={job.status.label} />
      </TableCell>

      <TableCell align="right">
        <Tooltip title="Supprimer la mission" arrow>
          <IconButton
            onClick={() => handleOpenDeleteModal(job)}
            sx={{
              '&:hover': { background: theme.palette.error.light },
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
}
