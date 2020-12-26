import React, { Component } from 'react'
import BankAccountService from '../../services/BankAccountService'

class ListBankAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                bankAccounts: []
        }
        this.addBankAccount = this.addBankAccount.bind(this);
        this.editBankAccount = this.editBankAccount.bind(this);
        this.deleteBankAccount = this.deleteBankAccount.bind(this);
        this.viewBankAccount = this.viewBankAccount.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
        this.transactionList = this.transactionList.bind(this);
    }

    deleteBankAccount(id){
        BankAccountService.deleteBankAccount(id).then( res => {
            this.setState({bankAccounts: this.state.bankAccounts.filter(bankAccount => bankAccount.id !== id)});
        });
    }
    viewBankAccount(id){
        this.props.history.push(`/view-bank-account/${id}`);
    }
    editBankAccount(id){
        this.props.history.push(`/add-bank-account/${id}`);
    }

    componentDidMount(){
        BankAccountService.getAllBankAccounts().then((res) => {
            this.setState({ bankAccounts: res.data});
        });
    }

    addBankAccount(){
        this.props.history.push('/add-bank-account/add');
    }

    addTransaction(){
        this.props.history.push('/add-transaction');
    }

    transactionList(){
        this.props.history.push('/transactions');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Bank Account List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addBankAccount}> Add Bank Account</button>
                    <button style={{marginLeft: "10px"}} className="btn btn-primary" onClick={this.transactionList}> Transaction List</button>
                    <button style={{marginLeft: "10px"}} className="btn btn-primary" onClick={this.addTransaction}> Add Transaction</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Bank Account Name</th>
                                    <th> Bank Account Owner</th>
                                    <th> Bank Account Amount</th>
                                    <th> Bank Account Debit</th>
                                    <th> Bank Account Credit</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.bankAccounts.map(
                                        bankAccount => 
                                        <tr key = {bankAccount.id}>
                                             <td> {bankAccount.bankName} </td>   
                                             <td> {bankAccount.owner}</td>
                                             <td> {bankAccount.amount}</td>
                                             <td> {bankAccount.debit ? 'true' : 'false'}</td>
                                             <td> {bankAccount.credit ? 'true' : 'false'}</td>
                                             <td>
                                                 <button onClick={ () => this.editBankAccount(bankAccount.id)} className="btn btn-sm btn-info">Update </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBankAccount(bankAccount.id)} className="btn btn-sm btn-danger">Delete </button> */}
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBankAccount(bankAccount.id)} className="btn btn-sm btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBankAccountComponent
