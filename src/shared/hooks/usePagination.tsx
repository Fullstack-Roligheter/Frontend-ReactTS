import React, {useState} from "react"
import { IPagination } from "../Interfaces/IPagination";
import { Pagination } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const UsePagination = (props: IPagination) => {
    
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {data, itemsPerPage} = props;
    const itemCount = data.length;

    // MUI:s egna event handler
    // Error: Type 'ChangeEvent<unknown> is not assignable to type 'SelectChangeEvent<unknown>'
    // const onPageChange = (ChangeEvent: SelectChangeEvent<unknown>) => {
    //     const value = ChangeEvent.target.value as number
    // }

    // Issue: 'event' implicitly has an 'any' type
    // const onPageChange = (event: React.ChangeEvent<{value: number}>) => { 
    //     const newPage = event.target.value;
    //     setCurrentPage(newPage);
    // }

    // Returnerar data för den activa sidan
    const getCurrentData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage

        return data.slice(start, end);
    }; 

    // Räknar ut hur många pages ska skapas beroende på hur mycket data som finns
    const pageCount = Math.ceil(itemCount / itemsPerPage);

    return{
        currentPage, getCurrentData, setCurrentPage, pageCount
    }
};

export default UsePagination;

// return(
//     <Pagination
//     count={pageCount}
//     page={currentPage}
//     onChange={onPageChange}
//     color="primary"
//     showFirstButton
//     showLastButton
//     />
// )