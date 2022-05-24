// @ts-nocheck
import { Card } from '@mui/material';
import { Partner } from 'src/models/partner';
import PartnersTable from './PartnersTable';

function Partners() {

  const partners: Partner[] = [
    {
      id: '1',
      name: 'Boulangerie Le fournil de Carole',
      email: 'lefournildecarole@gmail.com',
      phone: '0769086554',
      address: '54 rue croix nivert, 75015 Paris',
      discount: [],
      status: {id: '1', label: 'active'}
    }
  ]

  return (
    <Card>
      <PartnersTable partners={partners} />
    </Card>
  );
}

export default Partners;
