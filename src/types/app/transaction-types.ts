export interface ITransactionData {
  totalDeposits: number;
  totalPayments: number;
  totalTransfers: number;
  transaction: Transaction[];
}

export interface Transaction {
  amount: number;
  bankAccount: string;
  concept: string;
  id: number;
  operationType: string;
}
