 export const SortExpenseList = (sortOption: string, debits: any[]) => {
   let sortedDebits: any[] = [debits];
   let sortedDebitsByName;

    const sortByName = (sortBy: string) => {
// // sort by name
     if(sortBy === 'kategori'){
        sortedDebits = debits.sort((a, b) => {
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
       return sortedDebits
     } else if(sortOption === 'budget'){
       sortedDebits =debits.sort((a, b) => {
         const nameA = a.budget.toLocaleLowerCase() // ignore upper and lowercase
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
       return sortedDebits
     }else if(sortOption === 'kommentar'){
       sortedDebits =debits.sort((a, b) => {
         const nameA = a.comment.toLocaleLowerCase() // ignore upper and lowercase
         const nameB = b.comment.toLocaleLowerCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
       return sortedDebits
     }
    }

    if(sortOption === 'sum'){
      // sort by value
      sortedDebits = debits.sort((a, b) => a.amount - b.amount)
     
    } else if(sortOption === 'date'){
      // sort by date
      sortedDebits = debits.sort((a,b)=>a.date.getTime()-b.date.getTime());
      
    } else if(sortOption === 'category'){
      // sort by name
         sortedDebitsByName = sortByName(sortOption)
         if (sortedDebitsByName != undefined){
          sortedDebits = sortedDebitsByName
         }
    } else if(sortOption === 'budget'){
      // sort by name
         if (sortedDebitsByName != undefined){
          sortedDebits = sortedDebitsByName
         }

    } else if(sortOption === 'comment'){
      // sort by name
         if (sortedDebitsByName != undefined){
          sortedDebits = sortedDebitsByName
         }
    } 

 return sortedDebits

  }
