package test.skillwave.bankPayment.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
    @JoinColumn(name = "bank_id", referencedColumnName = "bank_id")
	@JsonBackReference
	private BankAccount bankAccount;

	@Column(name = "bankName")
	private String bankName;
	
	@Column(name = "amount")
	private Double amount;

	@Column(name = "type")
	private String type;

	@Column(name = "status")
	private String status;

	public Transaction() {

	}

	public Transaction(BankAccount bankAccount, String bankName, Double amount, String type, String status) {
		super();
		this.bankAccount = bankAccount;
		this.bankName = bankName;
		this.amount = amount;
		this.type = type;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BankAccount getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(BankAccount bankAccount) {
		this.bankAccount = bankAccount;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", bankAccount=" + bankAccount + ", bankName=" + bankName + ", amount="
				+ amount + ", type=" + type + ", status=" + status + "]";
	}

}
