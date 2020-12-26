import React, { Component } from 'react'
import BankAccountService from '../../services/BankAccountService'

class ViewBankAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            bankAccount: {},
            transactions: []
        }
        this.goBankAccountList = this.goBankAccountList.bind(this);
    }

    componentDidMount(){
        BankAccountService.getBankAccountById(this.state.id).then( res => {
            this.setState({bankAccount: res.data});
            if (res.data.transactions && res.data.transactions.length > 0) {
                this.setState({transactions: res.data.transactions});
            }else{
                this.setState({transactions: []});
            }
        })
    }

    goBankAccountList(){
        this.props.history.push('/bankAccounts');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">View Bank Account Details</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.goBankAccountList}> Bank Account List</button>
                 </div>
                 <br></br>
                <br></br>
                <div className = "card col-md-8 offset-md-2">
                    <div className = "card-body">
                        <div className = "row">
                            <label> Bank Account Name: </label>
                            <div> { this.state.bankAccount.bankName }</div>
                        </div>
                        <div className = "row">
                            <label> Bank Account Owner: </label>
                            <div> { this.state.bankAccount.owner }</div>
                        </div>
                        <div className = "row">
                            <label> Bank Account Amount: </label>
                            <div> { this.state.bankAccount.amount }</div>
                        </div>
                        <div className = "row">
                            <label> Bank Account Debit: </label>
                            <div> { this.state.bankAccount.debit ? 'true' : 'false' }</div>
                        </div>
                        <div className = "row">
                            <label> Bank Account Credit: </label>
                            <div> { this.state.bankAccount.credit ? 'true' : 'false' }</div>
                        </div>
                        <div className = "row">
                            <label> Bank Account Transactions: </label>
                            <div> {this.state.transactions.map(
                                        transaction => 
                                        <li key={transaction.id}>
                                            ID: {transaction.id} - AMOUNT: {transaction.amount} - TYPE: {transaction.type} - STATUS: {transaction.status}
                                        </li>
                                        
                                        // <tr key = {bankAccount.id}>
                                        //      <td> {bankAccount.bankName} </td>   
                                        //      <td> {bankAccount.owner}</td>
                                        //      <td> {bankAccount.amount}</td>
                                        //      <td> {bankAccount.debit ? 'true' : 'false'}</td>
                                        //      <td> {bankAccount.credit ? 'true' : 'false'}</td>
                                        //      <td>
                                        //          <button onClick={ () => this.editBankAccount(bankAccount.id)} className="btn btn-info">Update </button>
                                        //          <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBankAccount(bankAccount.id)} className="btn btn-danger">Delete </button>
                                        //          <button style={{marginLeft: "10px"}} onClick={ () => this.viewBankAccount(bankAccount.id)} className="btn btn-info">View </button>
                                        //      </td>
                                        // </tr>
                                    )
                                }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewBankAccountComponent
