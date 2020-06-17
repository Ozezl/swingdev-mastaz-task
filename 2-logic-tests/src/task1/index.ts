interface Transaction {
  id: number,
  sourceAccount: string,
  targetAccount: string,
  amount: number,
  category: string,
  time: string
}

export const getBalanceByCategoryInPeriod = (
  transactionsList: Transaction[],
  category: string,
  startTime: Date,
  endTime: Date = new Date('9999-12-12T12:34:00Z')
) => {
  const transactionsByCategoryAndTime: Transaction[] = transactionsList.filter(transaction => {
    return transaction.category === category && new Date(transaction.time) >= startTime && new Date(transaction.time) <= endTime
  })

  let balance: number = 0

  transactionsByCategoryAndTime.forEach(transaction => {
    balance += transaction.amount
  })
  
  return balance;
}
