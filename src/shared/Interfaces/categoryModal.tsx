export interface NewCategoryModalProps {
  onConfirm: () => void
  message: string
  categories: any
  callBack: Function
}

export interface EditCategoryModalProps {
  onConfirm: () => void
  categoryId: string | null
  categoryName: string | null
  categoryOldName: string
  message: string
  categories: any
  callBack: Function
}

export interface DeleteCategoryModalProps {
  onConfirm: () => void
  categoryId: string | null
  categoryName: string | null
  message: string
  categories: any
  callBack: Function
}

export interface CreateSubmitData {
  userId: string
  name: string
}

export interface EditSubmitData {
  userId: string | null
  categoryId: string | null
  categoryName: string
}
