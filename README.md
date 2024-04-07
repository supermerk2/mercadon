# REST-API

## Description

This project started as a REST API that provides endpoints for managing products and categories.
It allows users to perform CRUD operations on products and categories, such as creating, reading, updating, and deleting them.

## Installation

`npm i`

## Run locally

- Migrate local DB: `npx prisma migrate dev`
- Server start: `npm start`

## Run tests

`npm run test:unit`

## Github login:

- [Github CLI](https://cli.github.com/) needed: `gh --version`
- Check actual user: `gh auth status`
- Login: `gh auth login`

## API reference

| Parameter | Type      | Description |
| :-------- | :-------- | :---------- |
| api_key   | undefined | Not needed  |

## Environment variables

To run this project, you will need to add the following environment variables to your .env file

- `DATABASE_URL`

  > DATABASE_URL="file:./dev.db"

- `PORT`
  > PORT=3000

## Contributing

Contributions are always welcome!
