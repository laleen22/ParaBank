/*This Class is to locate all elements appear under CustomLogin section(which is not a page)
and perform necessary user actions on them*/

import AccountServices from '../businessComponents/AccountServices.cy'
import RegistrationPage from '../pageObjects/RegistrationPage.cy';
import DataReadWrite from '../UlitilyComponents/DataReadWrite.cy';

const dataReadWrite = new DataReadWrite();

class CustomLogin{
    
    getLogInUsernameBox(){
        return cy.get('input[name="username"]')
    }

    setLogInUsername(currentUserName){
        this.getLogInUsernameBox().type(currentUserName)   
    }

    getLogInPasswordBox(){
        return cy.get('input[name="password"]')
    }

    setLogInPassword(data){
            this.getLogInPasswordBox().type(data.password)
    }

    clickRegisterLink(){
        cy.get('a').contains('Register').click();
    }

    //Method for Login as current user
    loginasCurrentUser(data){
        dataReadWrite.readData('currentUserName').then((value) => {
            // Use the retrieved value
            cy.log('Retrieved value:', value);
            this.setLogInUsername(value)
          });
        this.setLogInPassword(data)
        cy.get('input.button[value="Log In"]').click()
    }

    //Method for validation of succefull Login
    verifySussefullLogin(){
        const accountServices = new AccountServices()
        accountServices.getAccountsOverviewTitle().invoke('text').should('contain','Accounts Overview')
    }

}

export default CustomLogin;