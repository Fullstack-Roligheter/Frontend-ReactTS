import instance from './baseURL.js'

export function GetCategoriesForUser(id: any) {
  return instance
    .get(`api/categories/GetCategoriesForUser?userId=${id}`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetCategoriesForUser: ', error)
      throw error
    })
}

export function GetUserCreatedCatogories(id: any) {
  return instance
    .get(`/api/categories/GetUserCreatedCategories?userId=${id}`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetCategoriesForUser: ', error)
      throw error
    })
}

// export function GetCategoryBudget(name: any, id: any) {
//   return axios
//     .get(`${BaseURL}/api/category/categorybudget${name}&${id}`)
//     .then((response) => {
//       const data = response.data
//       return data
//     })
//     .catch((error) => {
//       console.log('Error in GetCategoryBudget: ', error)
//       throw error
//     })
// }

export function CreateCategory(data: any) {
  return instance
    .post(`api/categories/CreateCategory`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in CreateCategory: ', error)
      throw error
    })
}
export function EditCategory(data: any) {
  return instance
    .put(`api/categories/EditCategory`, data)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in CreateCategory: ', error)
      throw error
    })
}
export function DeleteCategory(data: any) {
  debugger
  return instance
  .delete(`api/categories/DeleteCategory`, data)
  .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in CreateCategory: ', error)
      throw error
    })
}
