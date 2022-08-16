export interface ApiResponse<T> {
    total_rows: number,
    total_pages?: number,
    current_page?: number,
    data: T
}