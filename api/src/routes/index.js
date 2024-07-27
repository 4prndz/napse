import express from "express";
import config from "../lib/config.js";
import { defaultRoutes } from "./defaults.js";
import { userRoutes } from "./userRoutes.js";

export default () => {
  const router = express.Router();

  if (config.routes.user) {
    userRoutes(router);
  }

  if (config.routes.default) {
    defaultRoutes(router);
  }

  return router;
};
