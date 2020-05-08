import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transations = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    const transationsAll = {
      transactions: transations,
      balance
    }
    return response.json(transationsAll)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body
    const transactionRepository = new CreateTransactionService(transactionsRepository)

    const transaction = transactionRepository.execute({title, value, type})

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
