import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import {
  Button,
  ListItemIcon,
  TableFooter,
  TablePagination,
} from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { useUserContext } from '../../context/UserContext'
import SortExpenseList from './SortExpenseList'

import { Collapse, IconButton, Box } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'
import { Modal } from '../../shared/modal/modal'
import { useDeleteModal, useEditModal } from '../../shared/modal/useModal'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { EditDebitModal } from './editDebitModal/editDebitModal'
import { DeleteDebitModal } from './deleteDebitModal/deleteDebitModal'

import { DateFormatter } from '../../shared/functions/functions'

const ExpenseListOutput = (props: any) => {
  const user = useUserContext()

  // const [debitsToShow, setDebitsToShow] = useState<any[]>([props.debits])
  const [alteredDebitList, setAlteredDebitList] = useState<any[]>([])
  const [open, setOpen] = useState(-1)
  const [altered, setAltered] = useState(false)
  const [activeSortOption, setActiveSortOption] = useState('')
  const [sameSortOption, setSameSortOption] = useState(false)
  const [descending, setDescending] = useState(false)
  const [debitSendAmount, setDebitSendAmount] = useState(0)
  const [debitSendDate, setDebitSendDate] = useState(new Date())
  const [debitSendBudget, setDebitSendBudget] = useState('')
  const [debitSendComment, setDebitSendComment] = useState('')
  const [debitSendCategory, setDebitSendCategory] = useState('')
  const [debitSendId, setDebitSendId] = useState('')
  const { isShownEdit, toggleEdit } = useEditModal()
  const { isShownDelete, toggleDelete } = useDeleteModal()
  const onConfirmEdit = () => toggleEdit()
  const onConfirmDelete = () => toggleDelete()

  let debitsToShow = props.debits

  useEffect(() => {
    debitsToShow = alteredDebitList
  }, [altered])

  function UpdateDebitList(): any {
    props.callBack()
  }

  const SortExpenses = (sortBy: string) => {
    if (activeSortOption === sortBy) {
      setSameSortOption(true)
      setDescending(!descending)
    } else if (sameSortOption) {
      setSameSortOption(false)
      setDescending(false)
    }
    setAlteredDebitList(
      SortExpenseList(sortBy, props.debits, sameSortOption, descending)
    )
    setAltered(!altered)
    setActiveSortOption(sortBy)
  }

  const ToEdit = (
    debitId: string,
    debitDate: Date,
    debitAmount: number,
    debitCategory: string,
    debitBudget: string,
    debitComment: string
  ) => {
    setDebitSendId(debitId)
    setDebitSendAmount(debitAmount)
    setDebitSendDate(debitDate)
    setDebitSendCategory(debitCategory)
    setDebitSendBudget(debitBudget)
    setDebitSendComment(debitComment)
    toggleEdit()
  }

  const ToDelete = (
    debitId: string,
    debitDate: Date,
    debitAmount: number,
    debitCategory: string,
    debitBudget: string,
    debitComment: string
  ) => {
    setDebitSendId(debitId)
    setDebitSendAmount(debitAmount)
    setDebitSendDate(debitDate)
    setDebitSendCategory(debitCategory)
    setDebitSendBudget(debitBudget)
    setDebitSendComment(debitComment)
    toggleDelete()
  }

  //Pagination, sätter startpage 0, visar 5 rows per sida
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  //Om inte det finns jämt 5 rows kvar, visa tomma rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - debitsToShow.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  type HeaderType = {
    title: string
    sortTarget: string
  }

  const headCells: HeaderType[] = [
    {
      title: 'Date',
      sortTarget: 'date',
    },
    {
      title: 'Amount',
      sortTarget: 'sum',
    },
    {
      title: 'Category',
      sortTarget: 'category',
    },
    {
      title: 'Budget',
      sortTarget: 'budget',
    },
  ]

  return (
    <>
      <Box
        width={800}
        minWidth={800}
        display='flex'
        flexWrap='wrap'
        height={'fit-content'}
        sx={{ mt: 7 }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow key='table-header'>
                <TableCell key={'space'}></TableCell>
                {headCells.map((headCell: HeaderType) => (
                  <TableCell key={headCell.title}>
                    <Button
                      onClick={() => {
                        SortExpenses(headCell.sortTarget)
                      }}
                    >
                      {headCell.title}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? debitsToShow.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : debitsToShow
              ).map((debit: any, index: number) => (
                <>
                  <TableRow key={debit.id + 'row'}>
                    <TableCell
                      key={debit.id + 'open'}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      <IconButton
                        onClick={() => setOpen(open === index ? -1 : index)}
                      >
                        {open === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      key={debit.id + debit.date}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      {DateFormatter(debit.date)}
                    </TableCell>
                    <TableCell
                      key={debit.id + debit.amount}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      {debit.amount}
                    </TableCell>
                    <TableCell
                      key={debit.id + debit.category}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      {debit.category}
                    </TableCell>
                    <TableCell
                      key={debit.id + debit.budget}
                      colSpan={5}
                      sx={{ paddingBottom: 0, borderBottom: '0px' }}
                    >
                      {debit.budget}
                    </TableCell>
                    <TableCell
                      key={debit.id + 'edit'}
                      colSpan={5}
                      sx={{
                        borderBottom: '0px',
                        borderTop: '1px solid rgba(224, 224, 224, 1)',
                      }}
                    >
                      <ListItemIcon>
                        <IconButton
                          onClick={() => {
                            ToEdit(
                              debit.id,
                              debit.date,
                              debit.amount,
                              debit.category,
                              debit.budget,
                              debit.comment
                            )
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                    </TableCell>
                    <TableCell
                      key={debit.id + 'delete'}
                      colSpan={5}
                      sx={{
                        borderBottom: '0px',
                        borderTop: '1px solid rgba(224, 224, 224, 1)',
                      }}
                    >
                      <ListItemIcon>
                        <IconButton
                          onClick={() => {
                            ToDelete(
                              debit.id,
                              debit.date,
                              debit.amount,
                              debit.category,
                              debit.budget,
                              debit.comment
                            )
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemIcon>
                    </TableCell>
                  </TableRow>
                  <TableRow key={debit.id + 'commentrow'}>
                    <TableCell
                      key={debit.id + 'comment'}
                      className='comments'
                      colSpan={5}
                      sx={{
                        paddingBottom: 0,
                      }}
                    >
                      <Collapse
                        in={open === index}
                        timeout='auto'
                        unmountOnExit
                      >
                        <Box>Comment</Box>
                        {debit.comment}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell key={Date.now()} colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter
              sx={{
                borderBottom: '0px',
                borderTop: '1px solid rgba(224, 224, 224, 1)',
              }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={debitsToShow.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <>
        <Modal
          isShown={isShownEdit}
          hide={toggleEdit}
          headerText='Edit Debit'
          modalContent={
            <EditDebitModal
              onConfirm={onConfirmEdit}
              // onCancel={onCancel}
              message={'Change Debit'}
              debits={props.debits}
              categories={props.categories}
              budgets={props.budgets}
              debitId={debitSendId}
              debitAmount={debitSendAmount}
              debitDate={debitSendDate}
              debitBudget={debitSendBudget}
              debitCategory={debitSendCategory}
              debitComment={debitSendComment}
              callBack={UpdateDebitList}
            />
          }
        />
      </>
      <>
        <Modal
          isShown={isShownDelete}
          hide={toggleDelete}
          headerText='Delete Debit'
          modalContent={
            <DeleteDebitModal
              onConfirm={onConfirmDelete}
              message={'Delete following Debit?'}
              callBack={UpdateDebitList}
              debitId={debitSendId}
              debitDate={debitSendDate}
              debitAmount={debitSendAmount}
              debitComment={debitSendComment}
              debitCategory={debitSendCategory}
              debitBudget={debitSendBudget}
              debits={props.debits}
            />
          }
        />
      </>
    </>
  )
}

export default ExpenseListOutput
