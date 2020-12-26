package test.skillwave.bankPayment.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "bankAccount")
public class BankAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bank_id",nullable=false,unique=true)
	private long bankId;

	@Column(name = "bankName")
	private String bankName;

	@Column(name = "owner")
	private String owner;

	@Column(name = "amount")
	private Double amount;

	@Column(name = "debit")
	private Boolean debit;

	@Column(name = "credit")
	private Boolean credit;

	@OneToMany(mappedBy = "bankAccount")
	@JsonManagedReference
	private List<Transaction> transactions;

	public BankAccount() {

	}

	public BankAccount(String bankName, String owner, Double amount, Boolean debit, Boolean credit) {
		super();
		this.bankName = bankName;
		this.owner = owner;
		this.amount = amount;
		this.debit = debit;
		this.credit = credit;
		this.transactions = new ArrayList<Transaction>();
	}

	public long getId() {
		return bankId;
	}

	public void setId(long id) {
		this.bankId = id;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Boolean getDebit() {
		return debit;
	}

	public void setDebit(Boolean debit) {
		this.debit = debit;
	}

	public Boolean getCredit() {
		return credit;
	}

	public void setCredit(Boolean credit) {
		this.credit = credit;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}
	
	public void addTransaction(Transaction transaction) {
		this.transactions.add(transaction);
	}

	@Override
	public String toString() {
		return "BankAccount [bankId=" + bankId + ", bankName=" + bankName + ", owner=" + owner + ", amount=" + amount
				+ ", debit=" + debit + ", credit=" + credit + ", transactions=" + transactions + "]";
	}

}
