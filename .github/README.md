🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/current`        | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`    | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`        | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner` | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`        | owners, supervisors |                                                    |
| DELETE | `/users/:userId`        | owners, supervisors |                                                    |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.

# Training Bot API

![banner](img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> An Express + Node.js API for Training Bot

## Table of Contents

- [Background](#background)
- [Deploy](#Deploy)
- [API](#api)
  - [Authentication](#Authentication)
  - [Resources](#Resources)
    - [Auth](#Auth)
    - [Users](#Users)
    - [Team Members](#Team-Members)
    - [Training Series](#Training-Series)
    - [Messages](#Messages)
    - [Stripe](#Stripe)
    - [Slack](#Slack)
    - [Notifications](#Notifications)
    - [Responses](#Responses)
- [Maintainers](#maintainers)
- [License](#license)

## Background

TODO: Write background section

## Deploy

This project has an `app.json` file, which allows us to offer "one-click deployment" to Heroku. This will allow you to get your own version of Training Bot up and running both quickly and painlessly.

**NOTE:** Before clicking the button below you'll want to make sure you've completed the [prerequisite setup steps](../docs/prerequisites.md) in the [complete documentation](../docs/README.md).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/)

## API

### Authentication

Most routes require authentication, and Training Bot handles authentication by looking for a valid JWT's on the `Authorization` header of a given request.

Valid JWTs are provided by the Auth0 integration with our [React application](https://github.com/labs12-training-bot-2/labs12-training-bot-2-FE). However -- for testing -- You can get a token programattically using the [Auth0 Management API](https://auth0.com/docs/api/management/v2/get-access-tokens-for-test).

---

### Resources

#### Auth

| route       | methods | description                                              |                                                        Docs                                                         |
| :---------- | :-----: | :------------------------------------------------------- | :-----------------------------------------------------------------------------------------------------------------: |
| `api/auth/` |  POST   | Takes a valid JWT provided by Auth0 and logs the user in | [JS Docs](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/auth.js#L9-L65) |

---

#### Users

| route           | methods | description                                       |                                                        Docs                                                        |
| :-------------- | :-----: | :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------: |
| `api/users/:id` | DELETE  | Deletes a specific user based on the ID parameter | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/user.js#L7-L31) |

---

#### Team Members

| route                                  |     methods      | description                                                                                                                      |                                                            Docs                                                             |
| :------------------------------------- | :--------------: | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------: |
| `api/team-members/`                    |    GET, POST     | Get all Team Members associated with an authenticated User and/or Create a new Team Member associated with an authenticated User | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/teamMember.js#L58-L143)  |
| `api/team-members/:id`                 | GET, PUT, DELETE | Read, Update, and Delete specific Team Members                                                                                   | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/teamMember.js#L57-L141)  |
| `api/team-members/:id/unassign/:ts_id` |      DELETE      | Unassign a specified Team Member from a Training Series                                                                          | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/teamMember.js#L144-L213) |

---

#### Training Series

| route                               |      methods      | description                                                                                                                                 |                                                              Docs                                                               |
| :---------------------------------- | :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------ | :-----------------------------------------------------------------------------------------------------------------------------: |
| `api/training-series/`              |     GET, POST     | Get all the training series associated with an authenticated User and/or Create a new training series associated with an authenticated User |  [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/trainingSeries.js#L15-L53)  |
| `api/training-series/:id`           | GET, POST, DELETE | Read, Update, and Delete specific training series                                                                                           | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/trainingSeries.js#L55-L140)  |
| `api/training-series/:id/messages`  |        GET        | Get all the messages for a specific training series                                                                                         | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/trainingSeries.js#L142-L170) |
| `api/training-series/:id/assignees` |        GET        | Get the team members for the specific training series                                                                                       | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/trainingSeries.js#L172-L215) |

---

#### Messages

| route              |     methods      | description                                                                                                              |                                                          Docs                                                           |
| :----------------- | :--------------: | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------: |
| `api/messages/`    |    GET, POST     | Get all Messages associated with an authenticated User and/or Create a new Message associated with an authenticated User | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/message.js#L13-L66)  |
| `api/messages/:id` | GET, PUT, DELETE | Read, Update, and Delete specific Messages                                                                               | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/message.js#L68-L165) |

---

#### Stripe

| route                      | methods | description                                                                   |                                                          Docs                                                           |
| :------------------------- | :-----: | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------: |
| `api/stripe/`              |  POST   | allows user to update/change their stripe plan.                               | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L120-L168) |
| `api/stripe/register`      |  POST   | register the user with stripe's API to get a stripe ID                        | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L169-L198) |
| `api/stripe/unsubscribe`   |  POST   | allows user to unsubscribe from their current plan.                           | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L200-L223) |
| `api/stripe/plans`         |   GET   | allows user to see available plans (basic, premium, pro)                      | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L225-L256) |
| `api/stripe/subscriptions` |   GET   | Allows the user to access the three subscription that go with the three plans | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L257-L278) |
| `api/stripe/customer/plan` |   GET   | Shows the user what their current plan is                                     | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L279-L294) |
| `api/stripe/paymentintent` |  POST   | required by the stripe API to be able to collect credit card payments.        | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L296-L316) |

---

#### Slack

| route | methods | description | Docs |
|:--- | :---: | :--- | :---:|
| `api/slack/oauth` | POST | Creates authenticated Slack Token in the database after oauth validation | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/slack.js#L24-L60) |
| `api/slack/` | GET | Get all Slack users from the authenticated Slack workspace | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/slack.js#L62-L95)  |
| `api/slack/:id/history` | GET | Get all messages in specific DM chat history with specified Team Member | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/slack.js#L97-L138) |
| `api/slack/sendMessageNow` | POST | Bypass Notification timer and immediately send specified Team Member a Slack Message, for testing purposes only | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/slack.js#L140-L208) |

---

#### Notifications

| route                            |  methods  | description                                                                                                                        |                                                             Docs                                                              |
| :------------------------------- | :-------: | :--------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------: |
| `api/notifications/`             | GET, POST | Get all Notifications associated with an authenticated User and/or Create a new Notification associated with an authenticated User |  [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L15-L80)  |
| `api/notifications/:id`          |    GET    | Get specific Notifications                                                                                                         | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L82-L109)  |
| `api/notifications/:id/response` |    GET    | Get all Responses associated with an authenticated User for specific Notification                                                  | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L111-L143) |
| `api/notifications/:id/delete`   |  DELETE   | Delete specific Notifications                                                                                                      | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L145-L167) |

---


#### Responses

| route | methods | description | Docs |
|:--- | :---: | :--- | :---:|
| `api/responses` | GET | Get all Responses for authenticated User | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L22-L40) |
| `api/responses/:id` | GET, DELETE | Get or delete specific Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L42-L91) |
| `api/responses/email` | POST | Create a new email Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L93-L159)  |
| `api/responses/sms` | POST | Create a new text Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L161-L212)  |
| `api/responses/slack` | POST | Create a new Slack Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L214-L264)  |

---

## Maintainers
