export interface Association {
  id: string;
  status_id: string;
  siren: string;
  siret: string;
  name: string;
  email: string;
  longitude: number;
  latitude: number;
  creation_date: any;
  activity: string;
  address: string;
  description: string;
  link: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  // TO REMOVE
  cp: string;
  commune: string;
}
