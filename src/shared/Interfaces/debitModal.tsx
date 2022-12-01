export interface EditDebitModalProps {
  onConfirm: () => void
  debitId: string | null
  debitDate: Date
  debitAmount: number
  debitCategory: string
  debitComment: string | null
  debitBudget: string
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
  debitCategory: string | null
  debitBudget: string | null
  message: string
  debits: any
  callBack: Function
}

export interface EditSubmitData {
  userId: string | null
  debitId: string | null
  date: Date
  amount: number
  categoryId: string
  comment: string | null
  budgetId: string
}