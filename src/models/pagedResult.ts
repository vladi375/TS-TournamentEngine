export interface PagedResult<T> {
    totalPages: number;
    items: T[];
}