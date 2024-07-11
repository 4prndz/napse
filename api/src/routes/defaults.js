import express from "express";

const defaultRouter = express.Router();

export const defaultRoutes = (router) => {
  router.use("/", defaultRouter);

  defaultRouter.get("/ping", (req, res) => {
    console.log(`P: Ping: hitting handler ${req.url} - ${Date.now()}`);
    res.status(200).json({
      code: 200,
      message: `P: Pong: test successful - ${Date.now()}`,
    });
  });

  defaultRouter.all("/ping", (req, res) => {
    const code = 405;

    res.status(code).json({
      code,
      message: `Method ${req.method} not allowed on ${req.url} - ${Date.now()}`,
    });
  });

  defaultRouter.all("*", (req, res) => {
    const code = 404;
    res.status(code).json({
      code,
      message: `Route ${req.url} not found - ${Date.now()}`,
    });
  });
};
