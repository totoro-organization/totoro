export default interface PaginatedDataType<T> {
  data: T[];
  total: number;
  limit?: number;
  offset?: number;
}
