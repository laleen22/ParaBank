//PageCalss as per Page Object Model : AdminPage
class AdminPage{

    getPageUrl(){
       return cy.url();
    }
}

export default AdminPage;