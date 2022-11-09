import { useState } from "react";

 export const SortExpenseList = (sortOption: string, debits: any[]) => {
   const [sortedDebits, setSortedDebits] = useState<any[]>([])

    const sortByName = (sortBy: string) => {
// // sort by name
     if(sortBy === 'kategori'){
       debits.sort((a, b) => {
         const nameA = a.category.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.category.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
     } else if(sortOption === 'budget'){
       debits.sort((a, b) => {
         const nameA = a.budget.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.budget.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
     }else if(sortOption === 'kommentar'){
       debits.sort((a, b) => {
         const nameA = a.comment.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.comment.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
     }
    }

    if(sortOption === 'summa'){
      // sort by value
      let sortedByAmount = debits.sort((a, b) => a.amount - b.amount)
      setSortedDebits(sortedByAmount)
    } else if(sortOption === 'datum'){
      // sort by date
      let sortedByAmount = debits.sort((a,b)=>a.date.getTime()-b.date.getTime());
      setSortedDebits(sortedByAmount)
    } else if(sortOption === 'kategori'){
      // sort by name
          sortByName(sortOption)
    } else if(sortOption === 'budget'){
      // sort by name
          sortByName(sortOption)

    } else if(sortOption === 'kommentar'){
      // sort by name
          sortByName(sortOption)
    } 

 return sortedDebits

  }
