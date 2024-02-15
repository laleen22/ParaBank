//PageCalss as per Page Object Model : BillPaymentPage
//Locate All elements, enter details to UI form

import DataReadWrite from "../UlitilyComponents/DataReadWrite.cy";
import AccountServices from "../businessComponents/AccountServices.cy";

const dataReadWrite = new DataReadWrite
const accountServices = new AccountServices


class BillPaymentPage{

    getTitle(){
        return cy.get('h1[class="title"]');
    }
    getPayeeNameTextBox(){
       return cy.get('input[name="payee.name"]')
    }
    enterPayeeName(data){
        this.getPayeeNameTextBox().type(data.firstName)
    }

    getPayeeAddressTextBox(){
        return cy.get('input[name="payee.address.street"]')
    }
    enterPayeeAddress(data){
         this.getPayeeAddressTextBox().type(data.address)
    }

    getPayeeCityTextBox(){
        return cy.get('input[name="payee.address.city"]')
    }
    enterPayeeCity(data){
         this.getPayeeCityTextBox().type(data.city)
    }

    getPayeeStateTextBox(){
        return cy.get('input[name="payee.address.state"]')
    }
    enterPayeeState(data){
         this.getPayeeStateTextBox().type(data.state)
    }

    getPayeeZipTextBox(){
        return cy.get('input[name="payee.address.zipCode"]')
    }
    enterPayeeZip(data){
         this.getPayeeZipTextBox().type(data.zip)
    }

    getPayeePhoneTextBox(){
        return cy.get('input[name="payee.phoneNumber"]')
    }
    enterPayeePhone(data){
         this.getPayeePhoneTextBox().type(data.phoneNo)
    }

    getPayeeBillAccNoTextBox(){
        return cy.get('input[name="payee.accountNumber"]')
    }
    enterPayeeBillAccNo(data){
         this.getPayeeBillAccNoTextBox().type(data.payeeAccNo)
    }

    getConfirmPayeeBillAccNoTextBox(){
        return cy.get('input[name="verifyAccount"]')
    }
    enterConfirmPayeeBillAccNo(data){
         this.getConfirmPayeeBillAccNoTextBox().type(data.payeeAccNo)
    }

    getBillPaymentAmountTextBox(){
        return cy.get('input[name="amount"]')
    }
    enterBillPaymentAmount(data){
         this.getBillPaymentAmountTextBox().type(data.billPaymentAmount)
    }

    getFromAccountDropDown(){
        return cy.get('select[name="fromAccountId"]')
    }

    enterFromAccountValue(){
        dataReadWrite.readData('newAccountNumber').then((fromAccountNo) => {
            // Use the retrieved value
            cy.log('Bill will be paid from account No: ', fromAccountNo)
            this.getFromAccountDropDown().select(fromAccountNo);
          });
    }

    getSendPaymentButton(){
        return cy.get('input[class="button"]')
    }

    //Method for validating successfull bill payment
    verifySuccessfullFundTransfer(){
        this.getTitle().invoke('text').should('contain','Bill Payment Complete')
    }

    //Method for makin bill payment
    makeBillPayment(data){

        accountServices.getBillPayLink().click();
        cy.wait(2000)
        this.enterPayeeName(data)
        this.enterPayeeAddress(data)
        this.enterPayeeCity(data)
        this.enterPayeeState(data)
        this.enterPayeeZip(data)
        this.enterPayeePhone(data)
        this.enterPayeeBillAccNo(data)
        this.enterConfirmPayeeBillAccNo(data)
        this.enterBillPaymentAmount(data)
        this.enterFromAccountValue()
        this.getSendPaymentButton().click()
        cy.wait(3000)
        this.verifySuccessfullFundTransfer()

    }

}

export default BillPaymentPage;