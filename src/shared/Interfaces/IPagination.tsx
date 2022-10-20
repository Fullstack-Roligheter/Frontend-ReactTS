import { ChangeEvent, ReactEventHandler } from "react"

export interface IPagination {
 data: any,
 itemsPerPage: number,
 value: any,
 event: React.ChangeEvent<HTMLInputElement>,
 setCurrentPage: number,
 pageCount: number,
 onPageChange: any,
currentPage: number
}