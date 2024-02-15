//PageCalss as per Page Object Model : AccountOverviewPage

import AccountServices from "../businessComponents/AccountServices.cy";
import DataReadWrite from "../UlitilyComponents/DataReadWrite.cy"

const accountServices = new AccountServices
const dataReadWrite = new DataReadWrite


class AccountOverviewPage{



    //Method for Validating Account Deatils appear for new account
    //in Accounts OverviewPage
    validateNewAccountDetailsAppear(){
        accountServices.getAccountsOverviewLink().click();

        dataReadWrite.readData('newAccountNumber').then((accountNumber) => {
            cy.log('Retrieved new Account No :', accountNumber);
            cy.wait(2000)
            cy.get('tr td:nth-child(1)').each(($e1,index,$list) =>{
                const text = $e1.text()
                cy.wait(2000)
                if(text.includes(accountNumber)){
                    cy.wait(3000)
                    cy.log('Acc number Matched:',accountNumber)
                      cy.get('tr td:nth-child(1)').eq(index).next().invoke('text').then((text) => {
                        const valuewithoutSign = text.replace("$", "");
                        cy.log('Available Balance : ', valuewithoutSign )
                        const integerValue = parseInt(valuewithoutSign, 10);
                        cy.log(integerValue)
                        //expected Min Value
                        expect(integerValue).to.be.greaterThan(10.00);
                      });
                }
                
            })
            
        });
        
    }

}

export default AccountOverviewPage;