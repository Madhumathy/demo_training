import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("^the user is on the login page$", () => {
    console.log("Opening login page...")
})

When("^the user enters \"([^\"]*)\" and \"([^\"]*)\"$", (email, pwd) => {
    console.log(email, pwd)
})

Then("^the user should be redirected to the dashboard$", () => {

})