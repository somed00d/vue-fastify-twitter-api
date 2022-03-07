# vue-fastify-twitter-api

This is a basic example Vue 3 application with a Fastify backend in order to communicate with the Twitter API.

The frontend is made with Vite create app. The backend is from the [fastify-typescript-starter](https://github.com/matschik/fastify-typescript-starter).

Currently uses [node-twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) library to call Twitter

## Backend

You need to create a file in the `/backend` folder called `.env` and add your Twitter bearer token to it

`/backend/.env`
```
TWITTER_BEARER_TOKEN = XXX
```

Install dependencies:
```bash
cd backend
pnpm i
```

Open two terminals:
```bash
pnpm watch
```

```bash
pnpm dev
```

