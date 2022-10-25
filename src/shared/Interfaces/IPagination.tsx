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

// TypeScript exempel från en pagination-exempel

// export type Props = {
//     currentPage: number;
//     lastPage: number;
//     maxLength: number;
//     setCurrentPage: (page: number) => void;
//   };
