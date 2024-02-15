// Class to reade and write data to fixture
class DataReadWrite{
    
    writeData(dataToWrite){
        cy.readFile('cypress/fixtures/testData.json').then((existingData) => {
            // Parse the existing JSON string to convert it to an object and merge data with existing data
            const parsedData = typeof existingData === 'string' ? JSON.parse(existingData) : existingData;
            const mergedData = { ...parsedData, ...dataToWrite };
      
            // Convert object to a JSON string and writing to fixture
            const jsonString = JSON.stringify(mergedData);
            cy.writeFile('cypress/fixtures/testData.json', jsonString);
          });
    }
    readData(key){
       return cy.readFile('cypress/fixtures/testData.json').then((jsonData) => {

            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            cy.log('Retrieved value:', data[key]);
            return cy.wrap(data[key]);
        });
    }
}

export default DataReadWrite;