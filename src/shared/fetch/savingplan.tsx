import instance from './baseURL'

export function GetPlans(id: any) {
  return instance
    .get(`api/saving/GetPlans?userId=${id}`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetPlans: ', error)
      throw error
    })
}

export function CreateSaving(data: any) {
  return instance
    .post(`api/saving/CreateSavingPlan`, data)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error in CreateSavingPlan: ', error)
      throw error
    })
}

export function DeleteSaving(data: any) {
  console.log('data in delete: ', data)
  return instance
    .delete(`api/saving/DeletePlan/${data}`)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error in DeleteSavingPlan: ', error)
      throw error
    })
}

export function UpdatePlan(data: any) {
  console.log('data in UpdatePlan: ', data)
  return instance
    .put(`api/saving/UpdatePlan`, data)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error in UpdatePlan: ', error)
      throw error
    })
}
