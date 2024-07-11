import routes from "../../routes/index.js";
import config from "../config.js";

export const setupRoutes = (app) => {
  console.log("\n---Setting up routes---\n");

  const router = routes();
  app.use(config.api.prefix, router);
};
