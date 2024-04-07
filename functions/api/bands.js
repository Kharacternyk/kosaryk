import {getQuery, isBot, respond} from "../../functions";

export const onRequestPost = async (context) => {
  const query = getQuery(context);
  const name = query.get("name");

  if (name == null) {
    return respond(400);
  }
  if (await isBot(query.get("token"), context.env.turnstileSecret)) {
    return respond(401);
  }

  await context.env.db
    .prepare("insert into bands(name) values(?)")
    .bind(name)
    .run();

  return respond();
};

export const onRequestDelete = async (context) => {
  const query = getQuery(context);
  const identity = query.get("identity");

  if (identity == null) {
    return respond(400);
  }
  if (await isBot(query.get("token"), context.env.turnstileSecret)) {
    return respond(401);
  }

  await context.env.db
    .prepare("delete from bands where identity = ?")
    .bind(identity)
    .run();

  return respond();
};

export const onRequestGet = async (context) => {
  const { results } = await context.env.db
    .prepare("select identity, name from bands")
    .all();

  return Response.json(results);
};
