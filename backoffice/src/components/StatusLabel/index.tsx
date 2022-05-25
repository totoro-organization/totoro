import { Statuses } from "src/models/status";
import Label from "../Label";

export const statuses = {
    coming: {
        name: 'A venir',
        color: 'info',
    },
    pending: {
        name: 'En attente',
        color: 'info',
    },
    disabled: {
        name: 'Désactivé',
        color: 'info',
    },
    actived: {
        name: 'Actif',
        color: 'success',
    }, 
    deleted: {
        name: 'Supprimé',
        color: 'error',
    },
    denied: {
        name: 'Refusé',
        color: 'error',
    },
    accepted: {
        name: 'Accepté',
        color: 'success',
    },
    published: {
        name: 'Publié',
        color: 'success',
    },
    closed: {
        name: 'Fermé',
        color: 'error',
    },
    freezed: {
        name: 'Gelé',
        color: 'warning',
    },
    expired: {
        name: 'Expiré',
        color: 'warning',
    },
    opened: {
        name: 'Ouvert',
        color: 'success',
    },
    canceled: {
        name: 'Annulé',
        color: 'warning',
    }
}

interface StatusLabelProps {
    status: Statuses
}

const StatusLabel = ({ status }: StatusLabelProps ): JSX.Element => {
    const { name, color }: any = statuses[status];

    return <Label color={color}>{name}</Label>;
   
};

export default StatusLabel