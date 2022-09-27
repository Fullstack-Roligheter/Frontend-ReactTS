import instance from './baseURL.js'

// export function ListBudgetsPOST(data: any) {
//   return axios
//     .post(`${BaseURL}/api/budget/listallbudgetforspecificuser`, data)
//     .then((response) => {
//       const data = response.data
//       return data
//     })
//     .catch((error) => {
//       console.log('Error in ListBudgetsPOST: ', error)
//       throw error
//     })
// }

export function GetBudgetsForUser(id: any) {
  return instance
    .get(`api/budget/GetBudgetsForUser?${id}`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetBudgetsForUser: ', error)
      throw error
    })
}
