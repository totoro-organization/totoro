import { Status } from "src/models"
import { Order } from "src/utils/sortByAscOrder"

export interface ApiResponse<T> {
    total_rows: number,
    total_pages?: number,
    current_page?: number,
    data: T
}

export interface Query<T> {
    page?: number,
    size?: number,
    order?: Order,
    status?: Status<T>
}