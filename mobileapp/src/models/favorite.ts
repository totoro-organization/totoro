export interface Favorite {
  id: string;
  // TODO: Add Job model.
  job: any;
  // TODO: Add Organization model
  organization: {
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
