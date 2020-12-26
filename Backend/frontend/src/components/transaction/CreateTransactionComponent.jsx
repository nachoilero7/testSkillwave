import React, { Component } from 'react'
import BankAccountService from '../../services/BankAccountService'
import TransactionService from '../../services/TransactionService'

class CreateTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            bankAccount: '',
            bankName: '',
            amount: '',
            type: '',
            status: '',
            listBankAccounts: []
        }
        this.changeBankAccountHandler = this.changeBankAccountHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.saveOrUpdateTransaction = this.saveOrUpdateTransaction.bind(this);
        this.cancelTransaction = this.cancelTransaction.bind(this);
    }

    componentDidMount(){
        BankAccountService.getAllBankAccounts().then( (res) =>{
            let listBankAccounts = res.data;
            this.setState({
                listBankAccounts: listBankAccounts
            });
        });       
    }
    
    changeBankAccountHandler= (event) => {
        this.setState({bankAccount: event.target.value});
    }

    changeAmountHandler= (event) => {
        this.setState({amount: event.target.value.replace(/\D/,'')});
    }

    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    cancelTransaction(){
        this.props.history.push('/transactions');
    }

    saveOrUpdateTransaction = (e) => {
        e.preventDefault();
        let transaction = {bankAccount: this.state.bankAccount, amount: this.state.amount, type: this.state.type};
        console.log('transaction => ' + JSON.stringify(transaction));
        let bankAccountId = this.state.bankAccount;
        BankAccountService.getBankAccountById(bankAccountId).then( res => {
            let bankAccount = res.data;
            this.setState({bankAccount: bankAccount});
            this.setState({bankName: res.data.bankName});
            let amountBank = bankAccount.amount;
            let amountTransaction = this.state.amount;
            let type = this.state.type;
            if ((type === 'Debit' && bankAccount.debit) || (type === 'Credit' && bankAccount.credit)) {
                if (amountBank >= amountTransaction) {
                    console.log('bankAccount => ' + JSON.stringify(bankAccount));
                    bankAccount.amount = amountBank - amountTransaction;

                    BankAccountService.updateBankAccount(bankAccount, bankAccount.id).then( res => {
                        console.log('Bank Account updated successfully');
                        this.setState({bankAccount: res.data});
                        this.setState({status: 'Success'});
                        transaction = {bankAccount: this.state.bankAccount, bankName: this.state.bankName, amount: this.state.amount, type: this.state.type, status: this.state.status};
                        TransactionService.addTransaction(bankAccountId,transaction).then(res =>{
                            console.log('transaction => ' + JSON.stringify(res));
                            this.props.history.push('/transactions');
                        });
                    });
                }else{
                    this.setState({status: 'Failure - Not enough money'});
                    transaction = {bankAccount: this.state.bankAccount, bankName: this.state.bankName, amount: this.state.amount, type: this.state.type, status: this.state.status};
                    TransactionService.addTransaction(bankAccountId,transaction).then(res =>{
                        console.log('transaction => ' + JSON.stringify(res));
                        this.props.history.push('/transactions');
                    });
                }
            }else{
                this.setState({status: 'Failure - Payment not available'});
                transaction = {bankAccount: this.state.bankAccount, bankName: this.state.bankName, amount: this.state.amount, type: this.state.type, status: this.state.status};
                TransactionService.addTransaction(bankAccountId,transaction).then(res =>{
                    console.log('transaction => ' + JSON.stringify(res));
                    this.props.history.push('/transactions');
                });
            }
        })
        
        
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Create Transaction</h2>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Bank Name: </label>
                                            <select placeholder="Select Bank Account" name="bankAccount" className="form-control" 
                                                value={this.state.bankAccount} onChange={this.changeBankAccountHandler}>
                                                <option value="Select Bank Account"></option>
                                                {this.state.listBankAccounts.map(bankAccount => (
                                                    <option key={bankAccount.id} value={bankAccount.id}>
                                                        {bankAccount.bankName}
                                                    </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className = "form-group">
                                            <label> Amount: </label>
                                            <input type="text" pattern="[0-9]*" placeholder="Amount" name="amount" className="form-control" 
                                                value={this.state.amount} onChange={this.changeAmountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Type: </label>
                                            <div onChange={this.changeTypeHandler}>
                                                <input type="radio" value="Debit" name="type"/> Debit
                                                <br></br>
                                                <input type="radio" value="Credit" name="type"/> Credit
                                            </div>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateTransaction}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancelTransaction.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateTransactionComponent
