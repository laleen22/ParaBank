class AccountServices{
/* This Class is to locate all elements appear under Accountservices section(which is not a page)
and perform necessary user actions on them
*/
    getLogoutlink(){
        return  cy.get('a').contains('Log Out')
    }

    getAccountsOverviewTitle(){
       return cy.get('.title')
    }

    getOpenNewAccountLink(){
        return cy.get('a').contains('Open New Account')
    }

    getAccountsOverviewLink(){
        return cy.get('a').contains('Accounts Overview')
    }

    getTransferFundsLink(){
        return cy.get('a').contains('Transfer Funds')
    }

    getBillPayLink(){
        return cy.get('a').contains('Bill Pay')
    }
    logout(){
        this.getLogoutlink().click()
    }


}

export default AccountServices;