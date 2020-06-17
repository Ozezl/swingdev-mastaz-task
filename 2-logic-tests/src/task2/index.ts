interface Transaction {
  id: number,
  sourceAccount: string,
  targetAccount: string,
  amount: number,
  category: string,
  time: string
}

export const findDuplicateTransactions = (transactions: Transaction[]) => {
  const MILLISECONDS_IN_MINUTE: number = 60000

  const transactionsByTime: Transaction[] = [...transactions].sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime()
  })

  const transactionsByTimeAndDuplicate: Transaction[][] = transactionsByTime.map((transaction, index) => {
    return transactionsByTime.slice(index).filter(value => {
      return value.sourceAccount === transaction.sourceAccount && value.targetAccount === transaction.targetAccount
      && value.amount === transaction.amount && value.category === transaction.category
      && new Date(value.time).getTime() - new Date(transaction.time).getTime() <= MILLISECONDS_IN_MINUTE
    })
  }).filter(transactionList => transactionList.length >= 2)

  return transactionsByTimeAndDuplicate;
}
