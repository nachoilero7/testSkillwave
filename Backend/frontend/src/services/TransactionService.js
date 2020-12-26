import axios from 'axios';

const TRANSACTION_API_BASE_URL = "http://localhost:8080/api/transaction";

class TransactionService {

    getAllTransactions() {
        return axios.get(TRANSACTION_API_BASE_URL);
    }

    getAllBankAccountTransactions(bankAccountId) {
        return axios.get(TRANSACTION_API_BASE_URL + '/bankAccount/' + bankAccountId);
    }

    addTransaction(bankAccountId, transaction) {
        return axios.post(TRANSACTION_API_BASE_URL + '/bankAccount/' + bankAccountId, transaction);
    }
}

export default new TransactionService()