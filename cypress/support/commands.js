// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })






// import loginData from '../fixtures/signUpDetails.json'

import loginData from '../fixtures/signUpDetails.json'

// type(loginData.email)
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands. 
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('signUpNavigation',(name, email) => {
    cy.visit('/')
        cy.url().should('eq', 'https://automationexercise.com/')
        cy.get('.fa.fa-lock').click() ;
        // Initial Sign up
        cy.get('[data-qa="signup-name"]').clear().type(name)
        cy.get('[data-qa="signup-email"]').clear().type(email)
        cy.get('[data-qa="signup-button"]').click({force:true})
})

Cypress.Commands.add('loginwithPara', (email, password) => { 
    cy.visit('/login')
        // cy.get('.fa.fa-lock').click()
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(password)
        debugger 
        cy.get('[data-qa="login-button"]').click()
        cy.get('a[href="/logout"]').should('be.visible')
})

Cypress.Commands.add('loginWithNoParaAndFixture', () => { 
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type(loginData.email)
    cy.get('[data-qa="login-password"]').type(loginData["password"])  
    cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('loginWithNoPara', () => { 
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type("testtester12@demo.com")
    cy.get('[data-qa="login-password"]').type("admin123")  
    cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('login', (id, pwd) => { 

    cy.visit('/login')

    cy.intercept('POST','/login').as('loginCall')

    cy.get('[data-qa="login-email"]').type(id)
    cy.get('[data-qa="login-password"]').type(pwd)  
    cy.get('[data-qa="login-button"]').click()
    
        cy.wait('@loginCall')

})

Cypress.Commands.add('loginsession', (id, pwd) => { 
    cy.session([id,pwd], () => {
        cy.visit('/')
        cy.get('.fa.fa-lock').click()
        cy.get('[data-qa="login-email"]').type(id)
        cy.get('[data-qa="login-password"]').type(pwd)  
        cy.get('[data-qa="login-button"]').click()
        cy.get('a[href="/logout"]').should('be.visible')
    }
    // ,
    // {
    // cacheAcrossSpecs: true   // restoring session cache across the specs
    //without this, only session restored for specific specs
    // }
    )
})


Cypress.Commands.add('login1', (email, pwd) => { 
    
        cy.visit('/')
        cy.get('.fa.fa-lock').click()
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(pwd)  
        cy.get('[data-qa="login-button"]').click()
        cy.get('a[href="/logout"]').should('be.visible')
        
})
    
    // ,
    // {
    // cacheAcrossSpecs: true   // restoring session cache across the specs
    //without this, only session restored for specific specs
    // }
    


Cypress.Commands.add('getiFrame', (iframeSelector) => {
cy.get(iframeSelector)
.its('0.contentDocument.body').should('not.be.empty')
.then(cy.wrap);
});


// 
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Overwrite the visit command

// cy.visit('/')
// Cypress.Commands.overwrite('visit', (originalVisitFn, url) => {
//     originalVisitFn(url, { timeout: 2000 }) // Custom timeout   4000
// })

// Cypress.Commands.addAll

//////////    Custom Command for Filling Out a Form

Cypress.Commands.add('fillForm', (name, pwd) => {
    cy.get('#username').type(name)
    cy.get('#password').type(pwd)
    cy.get('#confirmPassword').type(pwd)
})


///////// Custom Command for Checking an Alert

Cypress.Commands.add('checkAlert', (alertText) => {
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(alertText)
    })
})
  

///////// Custom Command for Drag and Drop

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
    cy.get(sourceSelector).trigger('mousedown', { which: 1 })
    cy.get(targetSelector).trigger('mousemove').trigger('mouseup', { force: true })
})


///////// API Requests

Cypress.Commands.add('makeApiRequest', (method, url, body) => {
    cy.request({
      method: method,
      url: url,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
})



Cypress.Commands.add('loginMethod',(email, pwd) => {
    cy.visit('/')
        cy.get('[href="/login"]').click()
        cy.get('[data-qa="login-email"]').clear().type(email)
        cy.get('[data-qa="login-password"]').clear().type(pwd)
        cy.get('form[action="/login"]').submit()
        cy.url().should('eq','https://automationexercise.com/')
})







// Cypress.Commands.add('submit',(loc) => {
//     cy.get(loc).click()
// })

// Cypress.Commands.addAll({
//     submitlogin(loc) {
//     cy.get(loc).click()},
    
//     doubleClick(loc1) {
//         cy.get(loc1).doubleClick()},
//     })

//     overwrite()


// Cypress.Commands.addAll({
//     login(email, pw) {..},
//     visit(orig, url, options) {..},
//   })

Cypress.Commands.add('signUp', (name, email) => {
    cy.visit('/')
        cy.get('.fa.fa-lock').click()        
        // Initial Sign up
        cy.get('[data-qa="signup-name"]').clear().type(name)
        cy.get('[data-qa="signup-email"]').clear().type(email)
        cy.get('[data-qa="signup-button"]').click()
})


Cypress.Commands.add('LoginUser' , (email, pwd) => {
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(pwd)
    cy.get('[data-qa="login-button"]').click()
    cy.url().should('eq','https://automationexercise.com/')
})

Cypress.Commands.add('homePageValidation', () => {
    cy.get('a[href="/logout"]').should('be.visible')
})