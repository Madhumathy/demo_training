import userData from '../../fixtures/signUpDetails.json'

describe('Validating sign up application', () => {

    beforeEach(() => {
        cy.fixture("signUpDetails.json").then( function (loginTestData) {
            this.loginTestDataObj = loginTestData
        })
    })

    it("Validate login by accessing it through beforeEach hook", function () {
        cy.loginwithPara(this.loginTestDataObj.email , this.loginTestDataObj.password)
    }) 


    it("Login by accessing inline fixture", () => {
        cy.fixture("signUpDetails.json").then((testData) => {
            cy.loginwithPara(testData.email, testData.password)
        })
        
    })

    it.only('Login with hardcoded test data via custom commands',() => {
        cy.loginWithNoPara()
    })

    it('Login with hardcoded test data',() => {
        cy.loginwithPara("testtester12@demo.com","admin123")
    })

    it('Login by importing test data from fixture via custom commands',() => {
        cy.loginWithNoParaAndFixture()
    })

    it('Login with importing test data from fixture file',() => {
        cy.loginwithPara(userData.email, userData.password) 
        // cy.loginwithPara(userData["LoggingIn"]["ValidAccount"]["validUsername"], userData["LoggingIn"]["ValidAccount"]["validPassword"])
        // cy.loginwithPara(userData["LoggingIn"]["ValidAccount"]["validUsername"], userData.password)
    })

    it("Login with parameters by importing fixture", () => {
        var loginId = userData.email
        var loginPwd = userData.password
        cy.loginwithPara(loginId, loginPwd)
    })

    

    it("Validate login by accessing multiple inline parameters", () => {
        cy.fixture("signUpDetails.json").then((loginTestData) => {
            cy.loginwithPara(loginTestData["LoggingIn"]["ValidAccount"]["validUsername"], loginTestData["LoggingIn"]["ValidAccount"]["validPassword"])
        })
    })

    it("Validate login by accessing it through beforeEach hook", function () {
        cy.loginwithPara(this.loginTestDataObj.email , this.loginTestDataObj.password)
    }) 
})
    

    

    

    

      // Intercepting and mocking API request
    // cy.intercept('GET', '/api/user', { fixture: 'user.json' }).as('getUser');

    // // Test case
    // it('should handle API response', () => {
    // cy.visit('/profile')
    //     .wait('@getUser')
    //     .then(({ response }) => {
    //     expect(response.statusCode).to.equal(200);
    //     expect(response.body.name).to.equal('Louis Yoong');
    //     expect(response.body.email).to.equal('louis.y@example.com');
    //     expect(response.body.age).to.equal(32);
    //     });
    // });
