import { IPagination } from '../Interfaces/IPagination';
import { Pagination } from '@mui/material';

const PaginationBase = (props: IPagination) => {
 
    const {pageCount, onPageChange, currentPage} = props;

  return (
      <Pagination
        count={pageCount}
        onChange={onPageChange}
        page={currentPage}
        color="primary"
        showFirstButton
        showLastButton
      />
  );
};

export default PaginationBase;