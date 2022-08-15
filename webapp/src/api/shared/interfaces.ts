export interface ApiResponse<T> {
    total_rows: number,
    data: T
}