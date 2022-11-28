export interface EditDebitModalProps {
  onConfirm: () => void
  debitId: string | null
  debitDate: Date
  debitAmount: number
  debitCategoryId: string | null
  debitComment: string | null
  debitBudget: string | null
  message: string
  debits: any
  categories: any
  budgets: any
  callBack: Function
}

export interface DeleteDebitModalProps {
  onConfirm: () => void
  debitId: string | null
  debitDate: Date
  debitAmount: number
  debitComment: string | null
  debitCategoryId: string | null
  debitBudget: string | null
  message: string
  debits: any
  callBack: Function
}

export interface EditSubmitData {
  userId: string | null
  debitId: string | null
  debitDate: Date
  debitAmount: number
  debitCategoryId: string | null
  debitComment: string | null
  debitBudget: string | null
}