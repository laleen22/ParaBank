//Utility class to cater the necessities of API automation

import DataReadWrite from "./DataReadWrite.cy"
const dataReadWrite = new DataReadWrite

class APIUtility{
    
    //Concats the correct URL based on account number and payment amount
    async createURLFindTransactionByAmount(){
    let accNo =""
    let amount=""
    let url='http://localhost:5050/parabank-3.0.0-SNAPSHOT/services_proxy/bank/accounts/'

        try {
            // Data extraction form fixture
            // Wait for both data retrieval operations to complete
            const [accNoValue, amountValue] = await Promise.all([
                dataReadWrite.readData('newAccountNumber'),
                dataReadWrite.readData('billPaymentAmount')
            ]);         
            accNo = accNoValue;
            amount = amountValue;
        } catch (error) {
            console.error('Error reading data:', error);
        }

        // Check if both accNo and amount have valid values
        if (accNo && amount) {
            url += accNo + '/transactions/amount/' + amount;
            cy.log(url);
            return url;
        } else {    
            console.error('accNo or amount is undefined');
            return null; 
        }

    }

}

export default APIUtility