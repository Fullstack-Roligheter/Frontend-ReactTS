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

export function EditDebit(debit: any) {
  let info = {
    amount: debit.amount,
    budgetId: debit.budgetId,
    categoryId: debit.categoryId,
    comment: debit.comment,
    date: debit.date,
    debitId: debit.debitId,
    userId: debit.userId,
  }

  if (info.categoryId === '') {
    info.categoryId = null
  }

  if (info.budgetId === '') {
    info.budgetId = null
  }

  return instance
    .put(`api/debit/EditDebit`, info)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in EditDebit: ', error)
      throw error
    })
}
export function DeleteDebit(input: any) {
  const data = {
    userId: input.userId,
    debitId: input.debitId,
  }
  return instance
    .delete(
      `api/debit/DeleteDebit?userId=${data.userId}&debitId=${data.debitId}`
    )
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in DeleteDebit: ', error)
      throw error
    })
}
