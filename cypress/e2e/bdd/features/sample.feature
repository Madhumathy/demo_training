Feature: Login functionality

Scenario Outline: User logs in with different credentials
  Given the user is on the login page
  When the user enters "<username>" and "<password>"
  Then the user should be redirected to the dashboard

  Examples:
    | username     | password     |
    | user1        | pass1        |
    | user2        | pass2        |
    | invalidUser  | wrongPass    |

    Scenario Outline: User logs in with different credentials
  Given the user is on the login page
  When the user enters "<username>" and "<password>"
  Then the user should be redirected to the dashboard

  Examples:
    | username     | password     |
    | user1        | pass1        |
    | user2        | pass2        |
    | invalidUser  | wrongPass    |