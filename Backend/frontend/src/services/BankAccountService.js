import axios from 'axios';

const BANK_ACCOUNT_API_BASE_URL = "http://localhost:8080/api/bankAccount";

class BankAccountService {

    getAllBankAccounts() {
        return axios.get(BANK_ACCOUNT_API_BASE_URL);
    }

    createBankAccount(bankAccount) {
        return axios.post(BANK_ACCOUNT_API_BASE_URL, bankAccount);
    }

    getBankAccountById(bankAccountId) {
        return axios.get(BANK_ACCOUNT_API_BASE_URL + '/' + bankAccountId);
    }

    updateBankAccount(bankAccount, bankAccountId) {
        return axios.put(BANK_ACCOUNT_API_BASE_URL + '/' + bankAccountId, bankAccount);
    }

    deleteBankAccount(bankAccountId) {
        return axios.delete(BANK_ACCOUNT_API_BASE_URL + '/' + bankAccountId);
    }
}

export default new BankAccountService()