//PageCalss as per Page Object Model : OpenAccountPage
//Locate All elements, enter details to UI form

import AccountServices from "../businessComponents/AccountServices.cy";
import DataReadWrite from "../UlitilyComponents/DataReadWrite.cy";

const accountServices = new AccountServices()
const dataReadWrite = new DataReadWrite()

class OpenAccountPage{

    getPageUrl(){
       return cy.url();
    }

    getAccoutTypeDropDown(){
        return cy.get('#type');
     }

    getSubmitButton(){
        return cy.get('input[type="submit"]');
    }

    getTitle(){
        return cy.get('h1[class="title"]');
    }
    getNewAccountNumber(){
        return cy.get('#newAccountId');
    }

    //Methof for selecting account type
    selectAccountType(data){
        switch (data.accountType) {
            case 'Savings':
             this.getAccoutTypeDropDown().select('1').should('have.value','1')
              break;
            case 'Checking':
              this.getAccoutTypeDropDown().select('0').should('have.value','0')
              break;
            default:
              cy.log('Default case executed');
          }
    }

    //Method for validating successfull account opening
    verifySuccessfulAccountOpening(){
        this.getTitle().invoke('text').should('contain','Account Opened!')
    }

    //Method for opening account saving the account number for future reference
    openNewAccountAndSaveAccountNo(data){
        accountServices.getOpenNewAccountLink().click();
        this.selectAccountType(data)
        cy.wait(3000)
        this.getSubmitButton().click()
        this.verifySuccessfulAccountOpening()
        this.getNewAccountNumber().invoke('text').then((text) => {
                cy.log('New account number:', text);
                //Wrirting data to fixture
                const dataToWrite = { newAccountNumber: text };
                const dataReadWrite = new DataReadWrite();
                dataReadWrite.writeData(dataToWrite)
                
         });
        
    }
}

export default OpenAccountPage;