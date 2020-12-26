import React, { Component } from 'react'
import TransactionService from '../../services/TransactionService'

class ListTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transactions: []
        }
        this.addTransaction = this.addTransaction.bind(this);
        this.goBankAccountList = this.goBankAccountList.bind(this);
    }

    componentDidMount(){
        TransactionService.getAllTransactions().then((res) => {
            this.setState({ transactions: res.data});
        });
    }

    addTransaction(){
        this.props.history.push('/add-transaction');
    }

    goBankAccountList(){
        this.props.history.push('/bankAccounts');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Transaction List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addTransaction}> Add Transaction</button>
                    <button style={{marginLeft: "10px"}} className="btn btn-primary" onClick={this.goBankAccountList}> Bank Account List</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Bank Account Name</th>
                                    <th> Transaction Amount</th>
                                    <th> Transaction Type</th>
                                    <th> Transaction Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.transactions.map(
                                        transaction => 
                                        <tr key = {transaction.id}>
                                             <td> {transaction.bankName} </td>
                                             <td> {transaction.amount}</td>
                                             <td> {transaction.type}</td>
                                             <td style={{color: transaction.status === 'Success' ? 'green' : 'red'}}> {transaction.status}</td>
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

export default ListTransactionComponent
