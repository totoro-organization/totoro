// @ts-nocheck
import { Card } from '@mui/material';
import TableWrapper from 'src/components/TableWrapper';
import { Partner } from 'src/models/partner';
import { StatusEnum } from 'src/models/status';
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
      status: {id: '1', label: 'actived'}
    }
  ]

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Inactif'
    },
    {
      id: StatusEnum.freezed,
      name: 'Gelé'
    }
  ];

  return (
    <Card>
      {/* {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={partners}>
            <PartnersTable />
        </TableWrapper>
      } */}
      <TableWrapper statusOptions={statusOptions} items={partners}>
          <PartnersTable />
      </TableWrapper>
    </Card>
  );
}

export default Partners;
