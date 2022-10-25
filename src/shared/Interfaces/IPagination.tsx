// export interface PaginationProps {
//     data: any,
//     itemsPerPage: number,
//     value: any,
//     event: React.ChangeEvent<HTMLInputElement>,
//     setCurrentPage: number,
//     pageCount: number,
//     onPageChange: any,
//     currentPage: number
// }

// Denna behövs egentligen inte men kan vara användbart att se vilka props och typer som MUI:s egna paginatiation interface
export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

