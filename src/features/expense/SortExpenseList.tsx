const SortExpenseList = (sortOption: string, debits: any[],sameSortOption:boolean, descending:boolean) => {
   let alteredDebitList: any[] = [debits];
   let alteredDebitListByName;


   const sortByName = (sortBy: string,sameSortOption:boolean, descending:boolean) => {
// // sort by name
     if(sortBy === 'category'){
      if(sameSortOption && descending){
alteredDebitList = debits.sort((a, b) => {
         const nameA = a.category.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.category.toLocaleLowerCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return 1;
         }
         if (nameA > nameB) {
           return -1;
         }
         // names must be equal
         return 0;
       });
       return alteredDebitList
      }else{
        alteredDebitList = debits.sort((a, b) => {
         const nameA = a.category.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.category.toLocaleLowerCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
       return alteredDebitList
      }
     } else if(sortOption === 'budget'){
       if(sameSortOption && descending){
alteredDebitList =debits.sort((a, b) => {
           const nameA = a.budget.toLocaleLowerCase(); // ignore upper and lowercase
           const nameB = b.budget.toLocaleLowerCase(); // ignore upper and lowercase
           if (nameA < nameB) {
             return 1;
           }
           if (nameA > nameB) {
             return -1;
           }
           // names must be equal
           return 0;
         });
         return alteredDebitList
       }else{
         alteredDebitList =debits.sort((a, b) => {
           const nameA = a.budget.toLocaleLowerCase(); // ignore upper and lowercase
           const nameB = b.budget.toLocaleLowerCase(); // ignore upper and lowercase
           if (nameA < nameB) {
             return -1;
           }
           if (nameA > nameB) {
             return 1;
           }
           // names must be equal
           return 0;
         });
         return alteredDebitList
       }
     }
    }

    if(sortOption === 'sum'){
      // sort by value
      if(sameSortOption && descending){
        alteredDebitList = debits.sort((a, b) => b.amount - a.amount)
      }else{
        alteredDebitList = debits.sort((a, b) => a.amount - b.amount)
      }
     
    } else if(sortOption === 'date'){
      // sort by date
      if(sameSortOption && descending){
        alteredDebitList = debits.sort((a,b)=> +new Date(b.date)- +new Date(a.date));
      }else{
        alteredDebitList = debits.sort((a,b)=> +new Date(a.date)- +new Date(b.date));
      }
      
    } else if(sortOption === 'category'){
      // sort by name
        alteredDebitListByName = sortByName(sortOption, sameSortOption, descending)
        if (alteredDebitListByName != undefined){
          alteredDebitList = alteredDebitListByName
        }
    } else if(sortOption === 'budget'){
      // sort by name
        alteredDebitListByName = sortByName(sortOption, sameSortOption, descending)
        if (alteredDebitListByName != undefined){
          alteredDebitList = alteredDebitListByName
        }

    } 

 return alteredDebitList

  }

  export default SortExpenseList;
