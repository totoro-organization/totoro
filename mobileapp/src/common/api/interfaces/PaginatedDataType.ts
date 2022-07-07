export default interface PaginatedDataType<T> {
  totalRows?: number;
  data: T[];
  total: number;
  limit?: number;
  offset?: number;
}
