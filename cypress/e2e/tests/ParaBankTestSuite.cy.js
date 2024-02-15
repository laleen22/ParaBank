/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe'
import RegistrationPage from '../pageObjects/RegistrationPage.cy'
import AccountServices from '../businessComponents/AccountServices.cy'
import CustomLogin from '../businessComponents/CustomLogin.cy'
import GlobalNavigation from '../businessComponents/GlobalNavigation.cy'
import OpenAccountPage from '../pageObjects/OpenAccountPage.cy'
import AccountOverviewPage from '../pageObjects/AccountsOverviewPage.cy'
import FundTransferPage from '../pageObjects/FundTransferPage.cy'
import BillPaymentPage from '../pageObjects/BillPaymentPage.cy'
import APIUtility from '../UlitilyComponents/APIUtility.cy'
import DataReadWrite from '../UlitilyComponents/DataReadWrite.cy' 




describe('ParaBank test suite',function()
{
    const registrationPage = new RegistrationPage();
    let accountServices;
    let customLogin;
    let globalNavigation;
    let openAccountPage;
    let accountOverviewPage;
    let fundTransferPage;
    let billPaymentPage;
    let aPIUtility;
    let dataReadWrite;

    before(function()  {
        // Load data from the fixture file
        
    });

    beforeEach(() => {
        
        accountServices = new AccountServices();
        customLogin = new CustomLogin();
        globalNavigation = new GlobalNavigation();
        openAccountPage = new OpenAccountPage();
        accountOverviewPage = new AccountOverviewPage();
        fundTransferPage = new FundTransferPage();
        billPaymentPage = new BillPaymentPage();
        aPIUtility = new APIUtility();
        dataReadWrite = new DataReadWrite();

        cy.fixture('testData').then(function(data){
            this.data=data
              })

        //cy.visit("https://parabank.parasoft.com/parabank/index.htm")
        cy.visit("http://localhost:5050/parabank-3.0.0-SNAPSHOT/index.htm") 
      });

    

    it('First TestCase : User Registration and Logout', function(){

        //Entering Details to Registration
        customLogin.clickRegisterLink();
        registrationPage.enterRegistrationDetails(this.data);
        registrationPage.submitRegistration()
        cy.wait(2000)
        registrationPage.validateWelcomeTitle();
        accountServices.logout()
    })

    it('Second TestCase : Custom Login and Page Navigation', function(){
    
        //login from newly created user
        customLogin.loginasCurrentUser(this.data);
        customLogin.verifySussefullLogin();

        // verifyAboutUsNavigationLink
        globalNavigation.verifyAboutUsNavigationLink();
        globalNavigation.verifyServicesNavigationLink();
        globalNavigation.verifyAdminPageNavigationLink();
        accountServices.logout()
    })




    it('Third TestCase : Open New Account and Validate New Account Details', function(){
    
        //login from newly created user
        customLogin.loginasCurrentUser(this.data);
        customLogin.verifySussefullLogin();

        //OpenNewAccount
        openAccountPage.openNewAccountAndSaveAccountNo(this.data);
        //validateNewAccounTDetailsAppear
        accountOverviewPage.validateNewAccountDetailsAppear()
        accountServices.logout()
    
    })

    it('Fourth TestCase : Tranfer Funds', function(){
    
        //login from newly created user
        customLogin.loginasCurrentUser(this.data);
        customLogin.verifySussefullLogin();

        //FundsTransferFromNewAccountToAnotherAccount
        fundTransferPage.tranferFunds(this.data)
        accountServices.logout()
    
    })

    it('Fifth TestCase : Bill Payment', function(){
    
        //login from newly created user
        customLogin.loginasCurrentUser(this.data);
        customLogin.verifySussefullLogin();

        //MakeBillPayment
        billPaymentPage.makeBillPayment(this.data)
        accountServices.logout()
    
    })

   

    it('Sixth Test: FindTransactions API call and response validation', async function() {
        const url = await aPIUtility.createURLFindTransactionByAmount();
        
        if (url) {
            const response = await cy.request({
                method: 'GET',
                url: url,
                auth: {
                    username: this.data.currentUserName,
                    password: this.data.password
                }
            });
    
            // Handle response
            cy.log(response.body);
            expect(response.status).to.eq(200);
    
            // Extract the item
            const transaction = response.body[0];
    
            // Read newAccountNumber
            const value = await dataReadWrite.readData('newAccountNumber');
            const newAccountNumber = parseInt(value.replace(/'/g, ''));
            expect(transaction.accountId).to.eq(newAccountNumber);
    
            const amountFloat = parseFloat(transaction.amount);
            // Handling decimals
            const expectedAmountFormatted = amountFloat.toFixed(2);
            expect(expectedAmountFormatted).to.eq(this.data.billPaymentAmount);
        } else {
            console.error('URL is not valid');
        }
    });
    
})