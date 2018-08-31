# Signafire Take Home API

This is my submission for the take home portion of the Signafire interview for API Engineer.

## About

This API has the following:

- An Express server to serve the client
- An Express server to serve the data
- A sqlite3 database
- Interaction with an Elasticsearch instance

## Dependencies

The following are required to run the API:

- sqlite3
- NodeJS
- Java
- A running instance of Elasticsearch listening on port 9200

## Starting the API

From the root directory, run `npm start` on a Unix machine or `npm run start:windows` on a Windows machine to install the dependences and start both servers. The client is then viewable at http://localhost:3000.

## Interacting with the API

The API can be interacted with in the following ways:

- Through the client, a user can search for user documents in indices they have access to, specifically users named `fred`. For now, the user `foo` is assumed to already be authenticated.
- A list of accessible indices for `foo` can be viewed at http://localhost:80/users/foo

## Database

The sqlite3 database has three tables: `users`, `indices`, and `user_index_access`, structured as follows:

##### users

| id  | username |
| --- | -------- |
| 1   | foo      |

##### indices

| id  | index_name |
| --- | ---------- |
| 1   | foo_index  |
| 2   | bar_index  |
| 3   | baz_index  |

##### user_index_access

| user_id | index_id | access |
| ------- | -------- | ------ |
| 1       | 1        | true   |
| 1       | 2        | true   |
| 1       | 3        | false  |
