package test.skillwave.bankPayment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import test.skillwave.bankPayment.exception.ResourceNotFoundException;
import test.skillwave.bankPayment.model.BankAccount;
import test.skillwave.bankPayment.model.Transaction;
import test.skillwave.bankPayment.repository.BankAccountRepository;
import test.skillwave.bankPayment.repository.TransactionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class TransactionController {

	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	// get all transactions
	@GetMapping("/transaction")
	public List<Transaction> getAllTransactions() {
		return transactionRepository.findAll();
	}

	// get all transactions by bank account id
	@GetMapping("/transaction/bankAccount/{id}")
	public List<Transaction> getAllBankAccountTransactions(@PathVariable Long id) {
		BankAccount bankAccount = bankAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Bank Account not exist with id :" + id));
		return bankAccount.getTransactions();
	}

	// create transaction
	@PostMapping("/transaction/bankAccount/{id}")
	public Transaction addTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
		BankAccount bankAccount = bankAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Bank Account not exist with id :" + id));
		transaction.setBankAccount(bankAccount);
		Transaction transactionCreated = transactionRepository.save(transaction); 
		bankAccount.addTransaction(transactionCreated);
		bankAccountRepository.save(bankAccount);
		
		return transactionCreated;
	}

}
