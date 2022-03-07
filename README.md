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

Looking at `twitterController.ts` we have a basic route 
that accepts a username

```bash
$ curl localhost:4200/twitter/user/just_some_d00d                     
{"data":{"id":"2399226205","name":"𝙙00𝙙","username":"just_some_d00d"}}

$ curl localhost:4200/twitter/user/jack                                
{"data":{"id":"12","name":"jack⚡️","username":"jack"}}
```

So, how do we get this data on our frontend?

## Frontend

Install deps:
```bash
cd frontend
pnpm i
```

Create two components:
```bash
touch components/TwitterInput.vue
touch components/TwitterOutput.vue
```

### TwitterInput.vue

```javascript
import { ref } from "vue";
defineEmits(["twitterUsername"]);
const twitterUsername = ref("");
</script>

<template>
  <input
    type="text"
    v-model="twitterUsername"
    placeholder="Enter username"
    class="twitter__input"
  />
  <button
    class="twitter__button"
    @click="$emit('twitterUsername', twitterUsername)"
  >
    Submit
  </button>
  <hr>
</template>

<style scoped>
hr {
    border: none;
    background: #1DA1F2;
    height: 1px;
    margin: 1rem;
}
.twitter__input {
  padding: 0.5rem;
}
.twitter__button {
    background: none;
    border: n
    one;
    box-shadow: 0 0 0 1px #1DA1F2;
    border-radius: 4px;
    margin-left: 2rem;
    padding: 0.5rem 1rem;
    transition: all 300ms ease-in-out;
}

.twitter__button:hover {
    box-shadow: 0 0 0 2px #1DA1F2;
}
</style>
```

### TwitterOutput.vue

```javascript
<script lang="ts" setup>
defineProps<{
    twitterData: {}
}>()
</script>

<template>
    {{ twitterData }}
</template>
```

### App.vue

```javascript
<script setup lang="ts">
import { ref } from 'vue'
import TwitterInput from './components/TwitterInput.vue';
import TwitterOutput from './components/TwitterOutput.vue';
const twitterData = ref({})
function getUsernameData(twitterUsername: string) {
  fetch(
    `http://localhost:4200/twitter/user/${twitterUsername}`
  )
    .then(response => response.json())
    .then(data => twitterData.value = data)
}
</script>

<template>
  <TwitterInput @twitter-username="getUsernameData($event)" />
  <TwitterOutput :twitter-data="twitterData" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

**Ooops, CORS!**

```bash
cd ../backend
pnpm add fastify-cors
```

Update `backend/src/app.ts`

```bash
import fastify from "fastify";
import fastifyEnv from "fastify-env";
import fastifyCors from "fastify-cors";
import router from "./router";

const schema = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'string',
      default: 4200
    }
  }
}

const options = {
  dotenv: true,
  schema: schema,
}

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

// Middleware: Router
server.register(fastifyEnv, options);
server.register(router);
server.register(fastifyCors);

export default server;
```