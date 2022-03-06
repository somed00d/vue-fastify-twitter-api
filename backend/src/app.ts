import fastify from "fastify";
import fastifyEnv from "fastify-env";
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

export default server;
