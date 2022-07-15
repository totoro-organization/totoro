import { StatusEnum } from 'src/models';
import Label from '../Label';

const statuses = {
  coming: {
    name: 'A venir',
    color: 'info'
  },
  pending: {
    name: 'En attente',
    color: 'info'
  },
  disabled: {
    name: 'Désactivé',
    color: 'info'
  },
  actived: {
    name: 'Actif',
    color: 'success'
  },
  deleted: {
    name: 'Supprimé',
    color: 'error'
  },
  denied: {
    name: 'Refusé',
    color: 'error'
  },
  accepted: {
    name: 'Accepté',
    color: 'success'
  },
  published: {
    name: 'Publié',
    color: 'success'
  },
  closed: {
    name: 'Fermé',
    color: 'error'
  },
  freezed: {
    name: 'Gelé',
    color: 'warning'
  },
  expired: {
    name: 'Expiré',
    color: 'warning'
  },
  opened: {
    name: 'Ouvert',
    color: 'success'
  },
  canceled: {
    name: 'Annulé',
    color: 'warning'
  },
  requested: {
    name: 'En attente',
    color: 'info'
  },
  invited: {
    name: 'Invité',
    color: 'success'
  }
} as const;

interface StatusLabelProps {
  status: keyof typeof StatusEnum;
}

const StatusLabel = ({ status }: StatusLabelProps): JSX.Element => {
  const { name, color }: typeof statuses[StatusEnum] = statuses[status];

  return <Label color={color}>{name}</Label>;
};

export default StatusLabel;
