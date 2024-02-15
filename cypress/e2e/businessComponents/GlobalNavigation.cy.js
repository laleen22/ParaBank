/*This Class is to locate all elements appear under GlobalNavigation section(which is not a page)
and perform necessary user actions on them*/

import AboutUsPage from '../pageObjects/AboutUsPage.cy'
import ServicesPage from '../pageObjects/ServicesPage.cy'
import AdminPage from '../pageObjects/AdminPage.cy'

class GlobalNavigation{

    getAboutUslink(){
        return  cy.get('a').contains('About Us')
    }

    navigateToAboutUs(){
       this.getAboutUslink().click()
    }

    getServiceslink(){
        return  cy.get('a').contains('Services')
    }

    navigateToServices(){
        this.getServiceslink().click()
    }

    getAdminPagelink(){
        return  cy.get('a').contains('Admin Page')
    }

    navigateToAdminPage(){
        this.getAdminPagelink().click()
    }

    verifyAboutUsNavigationLink(){
        const aboutUsPage = new AboutUsPage()
        this.navigateToAboutUs()
        aboutUsPage.getPageUrl().should('contain','parabank-3.0.0-SNAPSHOT/about.htm') 
        //aboutUsPage.getPageUrl().should('contain','parabank.parasoft.com/parabank/about.htm') 

    }

    verifyServicesNavigationLink(){
        const servicesPage = new ServicesPage()
        this.navigateToServices()
        servicesPage.getPageUrl().should('contain','parabank-3.0.0-SNAPSHOT/services.htm')

    }

    verifyAdminPageNavigationLink(){
        const adminPage = new AdminPage()
        this.navigateToAdminPage()
        adminPage.getPageUrl().should('contain','parabank-3.0.0-SNAPSHOT/admin.htm')

    }
    

}

export default GlobalNavigation;