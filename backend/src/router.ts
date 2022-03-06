import { FastifyInstance } from "fastify";
import twitterController from "./controller/twitterController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(twitterController, { prefix: "/twitter" });
}
