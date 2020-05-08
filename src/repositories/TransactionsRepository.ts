import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
   const balanceAll =  this.transactions.reduce(
    (accumulator, current) => {
        return {
          income:
            current.type === 'income'
              ? accumulator.income + current.value
              : accumulator.income,
          outcome:
            current.type === 'outcome'
              ? accumulator.outcome + current.value
              : accumulator.outcome,
        };
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      ...balanceAll,
      total: balanceAll.income - balanceAll.outcome,
    };

    return balance
  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({title, value, type})
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
