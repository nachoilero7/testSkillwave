package test.skillwave.bankPayment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import test.skillwave.bankPayment.exception.ResourceNotFoundException;
import test.skillwave.bankPayment.model.BankAccount;
import test.skillwave.bankPayment.repository.BankAccountRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BankAccountController {

	@Autowired
	private BankAccountRepository bankAccountRepository;

	// get all bank accounts
	@GetMapping("/bankAccount")
	public List<BankAccount> getAllBankAccounts() {
		return bankAccountRepository.findAll();
	}

	// create bank account
	@PostMapping("/bankAccount")
	public BankAccount createBankAccount(@RequestBody BankAccount bankAccount) {
		return bankAccountRepository.save(bankAccount);
	}

	// get bank account by id
	@GetMapping("/bankAccount/{id}")
	public ResponseEntity<BankAccount> getBankAccountById(@PathVariable Long id) {
		BankAccount bankAccount = bankAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Bank Account not exist with id :" + id));
		return ResponseEntity.ok(bankAccount);
	}

	// update bank account
	@PutMapping("/bankAccount/{id}")
	public ResponseEntity<BankAccount> updateBankAccount(@PathVariable Long id,
			@RequestBody BankAccount bankAccountDetails) {
		BankAccount bankAccount = bankAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Bank Account not exist with id :" + id));

		bankAccount.setBankName(bankAccountDetails.getBankName());
		bankAccount.setOwner(bankAccountDetails.getOwner());
		bankAccount.setAmount(bankAccountDetails.getAmount());
		bankAccount.setDebit(bankAccountDetails.getDebit());
		bankAccount.setCredit(bankAccountDetails.getCredit());
		bankAccount.setTransactions(bankAccountDetails.getTransactions());

		BankAccount updatedBankAccount = bankAccountRepository.save(bankAccount);
		return ResponseEntity.ok(updatedBankAccount);
	}

	// delete bank account
	@DeleteMapping("/bankAccount/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBankAccount(@PathVariable Long id) {
		BankAccount bankAccount = bankAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Bank Account not exist with id :" + id));

		bankAccountRepository.delete(bankAccount);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
