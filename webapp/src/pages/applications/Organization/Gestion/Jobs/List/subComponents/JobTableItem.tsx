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

import StatusLabel from '../../../../../../../components/StatusLabel';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';

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
    <TableRow hover key={job.id} selected={isSelectedJob}>
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
          <Link to={`/gestion/missions/${job.id}`}>{job.title}</Link>
          <Link to={`/association/gestion/missions/${job?.id}`}>
            {job?.title}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {job.author.organization
            ? job.author.organization.name
            : `${job.author.user.firstname} ${job.author.user.lastname} (${job.author.user.username})`}
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
          {getFormatLocalDate(job?.createdAt)}
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
          {job.participants_max - job.remaining_place} / {job.participants_max}
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
          {job.difficulty.token}
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
