//PageCalss as per Page Object Model : RegistrationPage
//Locate All elements, enter details to UI form

import DataReadWrite from '../UlitilyComponents/DataReadWrite.cy'

const dataReadWrite = new DataReadWrite()

class RegistrationPage{

    getFirstNameTextBox(){
        return cy.get('input[name="customer.firstName"]')
    }
    enterFirstName(data){
       this.getFirstNameTextBox().type(data.firstName)
    }

    getLastNameTextBox(){
        return cy.get('input[name="customer.lastName"]')
    }
    enterLasttName(data){
       this.getLastNameTextBox().type(data.lastName)
    }

    getAddressTextBox(){
        return cy.get('input[name="customer.address.street"]')
    }
    enterAddress(data){
       this.getAddressTextBox().type(data.address)
    }

    getCityTextBox(){
        return cy.get('input[name="customer.address.city"]')
    }
    enterCity(data){
       this.getCityTextBox().type(data.city)
    }

    getStateTextBox(){
        return cy.get('input[name="customer.address.state"]')
    }
    enterState(data){
       this.getStateTextBox().type(data.state)
    }

    getZipCodeTextBox(){
        return cy.get('input[name="customer.address.zipCode"]')
    }
    enterZipCode(data){
       this.getZipCodeTextBox().type(data.zip)
    }

    getphoneNoTextBox(){
        return cy.get('input[name="customer.phoneNumber"]')
    }
    enterphoneNo(data){
       this.getphoneNoTextBox().type(data.phoneNo)
    }

    getSsnTextBox(){
        return cy.get('input[name="customer.ssn"]')
    }
    enterSsn(data){
       this.getSsnTextBox().type(data.ssn)
    }

    getPwdTextBox(){
        return cy.get('input[name="customer.password"]')
    }
    enterPwd(data){
       this.getPwdTextBox().type(data.password)
    }

    getConfirmPwdTextBox(){
        return cy.get('input[name="repeatedPassword"]')
    }
    enterConfirmPwd(data){
       this.getConfirmPwdTextBox().type(data.confirmPassword)
    }

    getUserNameTextBox(){
        return cy.get('input[name="customer.username"]')
    }

    enterUserName(){
        const username = 'user' + Date.now();
        this.getUserNameTextBox().type(username)
        const dataToWrite = { currentUserName: username };
        const dataReadWrite = new DataReadWrite();
        dataReadWrite.writeData(dataToWrite);
     }

    getRegisterButton(){
        return cy.get('input[value="Register"]')
    }

   //Method for filling the registration form
    enterRegistrationDetails(data){
        this.enterFirstName(data);
        this.enterLasttName(data);
        this.enterAddress(data);
        this.enterCity(data);
        this.enterState(data);
        this.enterZipCode(data);
        this.enterphoneNo(data);
        this.enterSsn(data);
        this.enterPwd(data);
        this.enterConfirmPwd(data);
        this.enterUserName();

     }

     //Method for submit registration
     submitRegistration(){
        this.getRegisterButton().click()
     }

     getWelcomeTitleText(){
        return cy.get('.title')
     }

     //Method for validating welcome title
     validateWelcomeTitle(){
        const welcomeText = this.getWelcomeTitleText().invoke('text');
        cy.wait(2000)
        //Read data from fixture
        dataReadWrite.readData('currentUserName').then((value) => {
            // Use the retrieved value
            cy.log('Retrieved value:', value);
            welcomeText.should('contain',  value)
          });
        
     }

}

export default RegistrationPage