## Prerequisits

Install:

- [YARN](https://yarnpkg.com/features/workspaces)
- [Docker](https://docs.docker.com/engine/install/)

Check `.env.example` for the required ENV variables to run the apps.

## Start MongoDb Docker instance

This will create a local development MongoDB.

```bash
yarn start:database
```

Using YARN workspaces to create a monorepo

Install dependeices from root folder:

```bash
yarn
```

## Run Frontend and Backend development mode

```bash
yarn dev
```

once Backend is running you can find the swagger Documentaion on

```bash
http://localhost:4000/api-docs/
```

![alt text](/server/images/Screenshot%20at%20Feb%2013%2008-13-40.png)

## Run Frontend and Backend production mode

```bash
yarn start
```

# Client (React front-end)

Run development mode standalone:

```bash
yarn dev:client
```

Run production mode standalone:

```bash
yarn start:client
```

# Server (express js)

Run development mode standalone:

```bash
yarn dev:server

```

Run production mode standalone:

```bash
yarn start:server
```
