type Status = 'visited' | 'created' | 'approved' | 'deposited' | 'canceled' | 'duplicate' | 'withdrawal';
export type CreatedTransactionStatus = 'waiting' | 'deposited';

export type UpdateTransaction = Partial<Transaction> & {
  status: Status,
}

export type Transaction = Partial<TransactionForm> & {
  currencyFromId: string,
  currencyToId: string,
  status: Status,
  domain?: string,
  amount?: number,
  percent?: number
}

export type TransactionForm = {
  amountFrom: number,
  amountTo: number,
  email: string,
  addressSending: string,
  hash?: string,
}

export type TransactionRes = {
  clientId: string,
  address: string,
  amount: number,
  createdAt: string,
  id: string
  qr: string,
  symbol: string,
  network: string,
  code: string,
}

export type CreatedTransaction = {
  amountFrom: number,
  amountTo: number,
  createdAt: string,
  currency: string,
  id: string,
  retention: {
    comment?: string,
    createdAt: string,
    id: string,
    text: string,
  } | null,
  status: CreatedTransactionStatus,
  code: string,
  address: string,
}
