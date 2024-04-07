import {createHandler} from "../../functions";

export const onRequestPost = createHandler({
  requiredKeys: ["name"],
  run: (database, name) =>
    database.prepare("insert into bands(name) values(?)").bind(name).run(),
});

export const onRequestDelete = createHandler({
  requiredKeys: ["identity"],
  run: (database, identity) =>
    database
      .prepare("delete from bands where identity = ?")
      .bind(identity)
      .run(),
});

export const onRequestGet = createHandler({
  isPublic: true,
  run: (database) => database.prepare("select identity, name from bands").all(),
});
