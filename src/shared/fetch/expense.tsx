import instance from './baseURL.js'

export function CreateDebit(data: any) {
  return instance
    .post(`api/debit/CreateDebit`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in CreateDebit: ', error)
      throw error
    })
}

export function GetDebitsForUser(id: any) {
  return instance
    .get(`api/debit/GetDebitListForUser?userId=${id}`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetDebitsForUser: ', error)
      throw error
    })
}

// export function GetExpenseForSpecificBudget(data: any) {
//   return axios
//     .post(`${BaseURL}/api/expense/GetExpenseForSpecificBudget`, data)
//     .then((response) => {
//       const data = response.data
//       return data
//     })
//     .catch((error) => {
//       console.log('Error in GetExpenseForSpecificBudget: ', error)
//       throw error
//     })
// }

// export function GetExpenseForSpecificBudgetSortedIntoCategories(data: any) {
//   return axios
//     .post(
//       `${BaseURL}/api/expense/GetExpenseForSpecificBudgetSortedIntoCategories`,
//       data
//     )
//     .then((response) => {
//       const data = response.data
//       return data
//     })
//     .catch((error) => {
//       console.log(
//         'Error in GetExpenseForSpecificBudgetSortedIntoCategories: ',
//         error
//       )
//       throw error
//     })
// }

// export function ExpenseFilter() {
//   return axios
//     .get('https://localhost:7073/api/expense/expensefilter')
//     .then((response) => {
//       const data = response.data
//       return data
//     })
//     .catch((error) => {
//       console.log('Error in ExpenseFilter: ', error)
//       throw error
//     })
// }
