import { useState } from "react"
import { IPagination } from "../Interfaces/IPagination";

const UsePagination = (props: IPagination) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data, itemsPerPage } = props;
    const itemCount = data.length;

    // MUI:s egna event handler
    // Error: Type 'ChangeEvent<unknown> is not assignable to type 'SelectChangeEvent<unknown>'
    // const onPageChange = (ChangeEvent: SelectChangeEvent<unknown>) => {
    //     const value = ChangeEvent.target.value as number
    // }

    // Returnerar data för den activa sidan
    const getCurrentData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage

        return data.slice(start, end);
    };

    // Räknar ut hur många pages ska skapas beroende på hur mycket data som finns
    const pageCount = Math.ceil(itemCount / itemsPerPage);

    return {
        currentPage, getCurrentData, setCurrentPage, pageCount
    }
};

export default UsePagination;
