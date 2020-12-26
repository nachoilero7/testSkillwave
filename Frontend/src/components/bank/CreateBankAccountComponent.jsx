import React, { Component } from 'react'
import BankAccountService from '../../services/BankAccountService';

class CreateBankAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            bankName: '',
            owner: '',
            amount: '',
            debit: '',
            credit: ''
        }
        this.changeBankNameHandler = this.changeBankNameHandler.bind(this);
        this.changeOwnerHandler = this.changeOwnerHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changeDebitHandler = this.changeDebitHandler.bind(this);
        this.changeCreditHandler = this.changeCreditHandler.bind(this);
        this.saveOrUpdateBankAccount = this.saveOrUpdateBankAccount.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === 'add'){
            return
        }else{
            BankAccountService.getBankAccountById(this.state.id).then( (res) =>{
                let bankAccount = res.data;
                this.setState({
                    bankName: bankAccount.bankName,
                    owner: bankAccount.owner,
                    amount: bankAccount.amount,
                    debit: bankAccount.debit,
                    credit: bankAccount.credit
                });
            });
        }        
    }
    
    changeBankNameHandler= (event) => {
        this.setState({bankName: event.target.value});
    }

    changeOwnerHandler= (event) => {
        this.setState({owner: event.target.value});
    }

    changeAmountHandler= (event) => {
        this.setState({amount: event.target.value.replace(/\D/,'')});
    }

    changeDebitHandler= (event) => {
        this.setState({debit: event.target.checked});
    }

    changeCreditHandler= (event) => {
        this.setState({credit: event.target.checked});
    }

    cancel(){
        this.props.history.push('/bankAccounts');
    }

    saveOrUpdateBankAccount = (e) => {
        e.preventDefault();
        let bankAccount = {bankName: this.state.bankName, owner: this.state.owner, amount: this.state.amount, debit: this.state.debit, credit: this.state.credit};
        console.log('bankAccount => ' + JSON.stringify(bankAccount));

        // step 5
        if(this.state.id === 'add'){
            BankAccountService.createBankAccount(bankAccount).then(res =>{
                this.props.history.push('/bankAccounts');
            });
        }else{
            BankAccountService.updateBankAccount(bankAccount, this.state.id).then( res => {
                this.props.history.push('/bankAccounts');
            });
        }
    }

    getTitle(){
        if(this.state.id === 'add'){
            return <h3 className="text-center">Add Bank Account</h3>
        }else{
            return <h3 className="text-center">Update Bank Account</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Bank Name: </label>
                                            <input placeholder="Bank Name" name="bankName" className="form-control" 
                                                value={this.state.bankName} onChange={this.changeBankNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Owner: </label>
                                            <input placeholder="Owner" name="owner" className="form-control" 
                                                value={this.state.owner} onChange={this.changeOwnerHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Amount: </label>
                                            <input type="text" pattern="[0-9]*" placeholder="Amount" name="amount" className="form-control" 
                                                value={this.state.amount} onChange={this.changeAmountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Debit: </label>
                                            <input type="checkbox" ame="debit" className="form-control" 
                                                value={this.state.debit} checked={this.state.debit} onChange={this.changeDebitHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Credit: </label>
                                            <input type="checkbox" name="credit" className="form-control" 
                                                value={this.state.credit} checked={this.state.credit} onChange={this.changeCreditHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateBankAccount}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateBankAccountComponent
