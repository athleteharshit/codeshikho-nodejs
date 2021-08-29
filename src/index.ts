import { Server } from "./server";

const server = new Server().app;

const port = 4000;

server.listen(port, () => {
  console.log("server is online");
});
