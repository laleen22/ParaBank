//PageCalss as per Page Object Model : FundTransferPage
//Locate All elements, enter details to UI form

import AccountServices from "../businessComponents/AccountServices.cy"; 
import DataReadWrite from "../UlitilyComponents/DataReadWrite.cy";


const accountServices = new AccountServices
const dataReadWrite = new DataReadWrite

class FundTransferPage{

    getTitle(){
        return cy.get('h1[class="title"]');
    }

    getAmountTextBox(){
        return cy.get('#amount')
    }
    enterTransferAmount(data){
        this.getAmountTextBox().type(data.transferAmount)
    }

    getFromAccountDropDown(){
        return cy.get('#fromAccountId')
    }
    getTranferButton(){
        return cy.get('input[type="submit"]')
    }

    enterFromAccountDropdownValue(){
        dataReadWrite.readData('newAccountNumber').then((accountNumber) => {
            this.getFromAccountDropDown().select(accountNumber);
          });
    }
    //Method for validating successfull fund transfer
    verifySuccessfullFundTransfer(){
        this.getTitle().invoke('text').should('contain','Transfer Complete!')
    }
    //Method for tranfer funds
    tranferFunds(data){
        accountServices.getTransferFundsLink().click();
        cy.wait(3000)
        this.enterTransferAmount(data)
        this.enterFromAccountDropdownValue();
        this.getTranferButton().click();
        this.verifySuccessfullFundTransfer();
    }
}

export default FundTransferPage;