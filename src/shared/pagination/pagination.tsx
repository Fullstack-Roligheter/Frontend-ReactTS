import {useState} from "react"
import { IPagination } from "../Interfaces/IPagination";

const Pagination = (props: IPagination) {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const {data, itemsPerPage} = props;
    const itemCount = data.length;

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
    };
};

export default Pagination;