import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import TwitterApi from "twitter-api-v2";

type TwitterRequest = FastifyRequest<{
  Params: { username: string };
}>;

export default async function userController(fastify: FastifyInstance) {
  const twitterClient = new TwitterApi(
    String(process.env.TWITTER_BEARER_TOKEN)
  );

  // Basic user information
  fastify.get(
    "/user/:username",
    async function (_request: TwitterRequest, reply: FastifyReply) {
      const roClient = twitterClient.readOnly;
      const user = await roClient.v2.userByUsername(_request.params.username);
      reply.send(user);
    }
  );
}
