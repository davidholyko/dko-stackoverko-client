# Stackoverko
Hi all and welcome to the GitHub Repo for Letterbox.
This project is designed to be a place for users to ask a technical question and receive a technical answer.
##### [Front End Repo](https://github.com/davidholyko/stackoverko-client)
##### [Front End Deployed](https://davidholyko.github.io/stackoverko-client)
##### [Back End Repo](https://github.com/davidholyko/stackoverko-api)
##### [Back End Deployed](https://stackoverko-api.herokuapp.com/)

## Description
Our app allows a user to have their own specific authentication through sign up,
to sign in, change their password, and sign out. While signed in, a user is able to create and read a question, like, or comment. A user can update, delete a comment as well and can delete their like.

## Installation

Fork and clone [Front End Repo](https://github.com/davidholyko/stackoverko-client)
```
npm i
npm start
```

Fork and clone [Back End Repo](https://github.com/davidholyko/stackoverko-api)
```
bin/rails db:create
bin/rails db:migrate
bin/rails server
```

## Technology
### Front End
- JavaScript
- HTML
- CSS
- React.js
- Prism.js
- Markdown.js
- react-bootstrap
- react-bs-notifier
- axios
- react-router-dom

### Back End
- Ruby
- Ruby on Rails

## How it works
Front end makes ajax requests to the API.
the API is a RESTful API built on expressjs. It queries the database and returns a JSON.
JavaScript parses the JSON and renders pieces of it on the page using handlebars. That HTML is stylized using bootstrap and custom SASS. Event listeners are attached with JQuery and page manipulation is handled by JavaScript

## Planning
1. Start Coding
2. Complete a component
3. Repeat Step 2

## Problem solving
- Check that the problem is a requirment
- Double check that its actually a requirement
- Read the error message
- Check for plurlalization/capitalization
- Check syntax
- Check if the code thats giving you trouble works somewhere else
- Simplify the code/process
- Console log parameters
- Console log output
- Try running code again
- Try do do it differently if none of the above worked and you still get the same error message
- A lot of collaboration with group members to tackle an issue
- Whiteboarding out the problem, to help connect dots and understand the process

## Entity Relationship Diagram
![ERD + Wireframe](https://i.imgur.com/ecjCDpB.jpg)

Current ERD
```
user has many questions
user has many comments
user has many likes
questions has many comments
questions has many likes
comments has many likes
```

## Known Issues
None for now.

## Wireframe
![Wireframe + ERD](https://i.imgur.com/ecjCDpB.jpg)

## User stories
- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see all users questions.
- As a unregistered user, I would like to see comments on those questions.
- As a signed in user, I would to create questions.
- As a signed in user, I would to comment on other users' questions.
- As a signed in user, I would to update and comments.
- As a signed in user, I would to delete and comments.

# Routes
| Verb    | URI Pattern            | Controller#Action             |
|---------|------------------------|-------------------------------|
| POST    | `/sign-up`             | `users.post/sign-up`          |
| POST    | `/sign-in`             | `users.post/sign-in`          |
| PATCH   | `/change-password`     | `users.patch/change-password` |
| DELETE  | `/sign-out`            | `users.delete/sign-out`       |
| POST    | `/questions`           | `create`                      |
| GET     | `/questions`           | `questions#index`             |
| GET     | `/questions/:id`       | `questions#show`              |
| PATCH   | `/questions/:id`       | `questions#update`            |
| DELETE  | `/questions/:id`       | `questions#destroy`           |
| POST    | `/likes`               | `likes#create`                |
| DELETE  | `/likes/:id`           | `likes#destroy`               |
| POST    | `/comments`            | `comments#create`             |
| GET     | `/comments`            | `comments#index`              |
| GET     | `/comments/:id`        | `comments#show`               |
| PATCH   | `/comments/:id`        | `comments#update`             |
| DELETE  | `/comments/:id`        | `comments#delete`             |

## Potential Future Improvements
- Tags
- In Browser Repl
- Add Markdown parser for comments
- Rich Text Format
- Implement post as Anonymous
