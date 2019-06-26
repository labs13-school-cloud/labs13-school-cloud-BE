# Training Bot API

![banner](img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> An Express + Node.js API for School in the Cloud

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
| `api/users` | GET  | Gets all users in the database | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L8-L28) |
| `api/user/volunteers` | GET  | Get all users with the role of Volunteer | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L31-L53) |
| `api/users/volunteers/approved` | GET  | Get all users with the role of Volunteer that are approved | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L57-L74) |
| `api/users/volunteers/pending` | GET  | Get all users with the role of Volunteer that are not approved | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L78-L95) |
| `api/users/volunteers/donator` | GET  | Get all users with the role of Volunteer that are donators | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L98-L115) |
| `api/users/volunteers/donator` | GET  | Get all users with the role of Volunteer that are donators | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L98-L115) |
| `api/users/:email` | GET  | Get user with specific email | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L119-L135) |
| `api/users/:id` | DELETE  | Delete a specific user in the database | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/user.js#L138-L162) |

---

#### Training Series

| route                                  |     methods      | description                                                                                                                      |                                                            Docs                                                             |
| :------------------------------------- | :--------------: | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------: |
| `api/training-series/`                    |    GET, POST     | Get all training series in database and/or Create a new training series | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/trainingSeries.js#L16-L43)  |
| `api/training-series/:id`                 | GET, PUT, DELETE | Read, Update, and Delete specific Training Series                                                                                   | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/trainingSeries.js#L66-L151)  |
| `api/training-series/:id/volunteers` |      DELETE, POST      | Get Volunteers in specific Training Series and add Volunteer to a training series                                                                         | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/trainingSeries.js#L183-L238) |
| `api/training-series/:id/volunteers/:user_id` |      DELETE      | Delete Volunteer (User) that is a part of the training series                                                                          | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/trainingSeries.js#L240-L262) |
| `api/training-series/volunteers/:user_id` |      GET      | Gets the Training Series the specific User is a part of                                                                         | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/trainingSeries.js#L264-L291) |

---

#### Classes

| route                               |      methods      | description                                                                                                                                 |                                                              Docs                                                               |
| :---------------------------------- | :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------ | :-----------------------------------------------------------------------------------------------------------------------------: |
| `api/classes`              |     GET, POST     | Get all the Classes in the database and/or Create a new Class |  [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/classes.js)  |
| `api/classes/:id`              |     GET, PUT, DELETE     | Read, Delete, Update specific class |  [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/classes.js)  |
| `api/classes/:id/volunteers`              |     GET, POST     | Get Volunteers in a specific class and/or add a Volunteer to a specific class |  [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/classes.js)  |
| `api/classes/:id/volunteers/:user_id`              |     Delete     | Delete (Remove) volunteer from specific Class |  [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/classes.js)  |


---

#### Messages

| route              |     methods      | description                                                                                                              |                                                          Docs                                                           |
| :----------------- | :--------------: | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------: |
| `api/messages/`    |    GET, POST     | Get all Messages in the database and/or Create a new Message | [JS Doc](https://github.com/labs13-school-cloud/labs13-school-cloud-BE/blob/master/controllers/message.js#L13-L63)  |
| `api/messages/:id` | GET, PUT, DELETE | Read, Update, and Delete specific Messages                                                                               | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/message.js#L68-L165) |

---

<!-- #### Stripe

| route                      | methods | description                                                                   |                                                          Docs                                                           |
| :------------------------- | :-----: | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------: |
| `api/stripe/`              |  POST   | allows user to update/change their stripe plan.                               | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L120-L168) |
| `api/stripe/register`      |  POST   | register the user with stripe's API to get a stripe ID                        | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L169-L198) |
| `api/stripe/unsubscribe`   |  POST   | allows user to unsubscribe from their current plan.                           | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L200-L223) |
| `api/stripe/plans`         |   GET   | allows user to see available plans (basic, premium, pro)                      | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L225-L256) |
| `api/stripe/subscriptions` |   GET   | Allows the user to access the three subscription that go with the three plans | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L257-L278) |
| `api/stripe/customer/plan` |   GET   | Shows the user what their current plan is                                     | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L279-L294) |
| `api/stripe/paymentintent` |  POST   | required by the stripe API to be able to collect credit card payments.        | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/stripe.js#L296-L316) | -->


#### Notifications

| route                            |  methods  | description                                                                                                                        |                                                             Docs                                                              |
| :------------------------------- | :-------: | :--------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------: |
| `api/notifications/`             | GET, POST | Get all Notifications associated with an authenticated User and/or Create a new Notification associated with an authenticated User |  [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L15-L80)  |
| `api/notifications/:id`          |    GET    | Get specific Notifications                                                                                                         | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L82-L109)  |
| `api/notifications/:id/response` |    GET    | Get all Responses associated with an authenticated User for specific Notification                                                  | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L111-L143) |
| `api/notifications/:id/delete`   |  DELETE   | Delete specific Notifications                                                                                                      | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/notification.js#L145-L167) |

---


<!-- #### Responses

| route | methods | description | Docs |
|:--- | :---: | :--- | :---:|
| `api/responses` | GET | Get all Responses for authenticated User | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L22-L40) |
| `api/responses/:id` | GET, DELETE | Get or delete specific Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L42-L91) |
| `api/responses/email` | POST | Create a new email Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L93-L159)  |
| `api/responses/sms` | POST | Create a new text Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L161-L212)  |
| `api/responses/slack` | POST | Create a new Slack Response | [JS Doc](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/controllers/responses.js#L214-L264)  |

--- -->

## Maintainers
