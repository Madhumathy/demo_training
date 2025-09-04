import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginData from '../../../fixtures/signUpDetails.json'

Given("I visit the login page", () => {
  cy.visit("/login");
});

When("I enter valid credentials", () => {
  cy.get('[data-qa="login-email"]').type(loginData.email);
  cy.get('[data-qa="login-password"]').type(loginData.password);
  cy.get('[data-qa="login-button"]').click();
  cy.wait(2000)
});

Then("I should be redirected to the homepage", () => {
  cy.homePageValidation()
});
