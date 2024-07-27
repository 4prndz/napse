import express from "express";
import config from "./config.js";
import { initApp } from "./initializers/index.js";

export const startServer = async () => {
  const app = express();
  const port = config.port;

  app.use(express.json())

  await initApp(app, config);

  try {
    app.listen(port, () => {
      console.log(`🚀 - Server running on port ${port}`);
    });
  } catch (err) {
    throw new Error(err);
  }
};
