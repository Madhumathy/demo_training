describe('Alerts',() =>{
    // cy.on("uncaught:exception", (e, runnable) => {
    //     console.log("error", e);
    //     console.log("runnable", runnable);
    //     console.log("error", e.message);
    //     return false; 
    // });

    beforeEach(() =>{
        // cy.viewport(360, 600)
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    })
    
//cypress will automatically close the alert box whatever type it may be
    it('handling JS alert',() => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.get('[onclick="jsAlert()"]').click()
        // cy.contains('Click for JS Alert').click()

        cy.on('window:alert', (text) => {
            expect(text).contains('I am a JS Alert')
        })
        cy.get('#result').should('have.text', 'You successfully clicked an alert')

    })

    it('confirm alert - true',() =>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.get('button[onclick="jsConfirm()"]').click()

        cy.on('window:confirm', (str) => {
            expect(str).to.contains('I am a JS Confirm')
        })

        cy.get('p#result').should('have.text','You clicked: Ok')
    })

    it('confirm alert - false',() =>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.get('button[onclick="jsConfirm()"]').click()
        
        cy.on('window:confirm', () => {
            return false
        })
        // alternate method to cancel
        // cy.on('window:confirm', () => false); 
        
        cy.get('#result').should('have.text','You clicked: Cancel')
    })

    it('Prompt alert - ok',() =>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.window().then((promptWin => {
            cy.stub(promptWin,'prompt').returns('Welcome')
        }))

        cy.get('[onclick="jsPrompt()"]').click()
        
        cy.get('#result').should('have.text','You entered: Welcome')
    })

    it('Prompt alert - cancel',() =>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.window().then((promptWin) => {
            cy.stub(promptWin,'prompt').callsFake((message) =>{
                return null 
            })  
        })  
        cy.get('[onclick="jsPrompt()"]').click()
        cy.get('#result').should('have.text','You entered: null')
    })

    it('Authenticated alert - method 1',() =>{
       cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth:{username: "admin",password: "admin"
            }  })
        
        cy.get('.example > p').should('have.text','\n    Congratulations! You must have the proper credentials.\n  ')

    })

    it('Authenticated alert - method 2',() =>{

        // https://admin:admin@the-internet.herokuapp.com/basic_auth

        //Include cred in url after //--- need to write username:password@ followed by url
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth') 
        cy.get('.example > p').should('have.text','\n    Congratulations! You must have the proper credentials.\n  ')
    })

})