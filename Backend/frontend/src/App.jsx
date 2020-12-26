import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListBankAccountComponent from './components/bank/ListBankAccountComponent';
import ListTransactionComponent from './components/transaction/ListTransactionComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBankAccountComponent from './components/bank/CreateBankAccountComponent';
import CreateTransactionComponent from './components/transaction/CreateTransactionComponent';
import ViewBankAccountComponent from './components/bank/ViewBankAccountComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch>
                          {/* BANK ACCOUNTS */}
                          <Route path = "/" exact component = {ListBankAccountComponent}></Route>
                          <Route path = "/bankAccounts" component = {ListBankAccountComponent}></Route>
                          <Route path = "/add-bank-account/:id" component = {CreateBankAccountComponent}></Route>
                          <Route path = "/view-bank-account/:id" component = {ViewBankAccountComponent}></Route>

                          {/* TRANSACTIONS */}
                          <Route path = "/transactions" component = {ListTransactionComponent}></Route>
                          <Route path = "/add-transaction" component = {CreateTransactionComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
