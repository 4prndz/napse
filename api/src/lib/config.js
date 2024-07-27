export default {
  port: process.env.PORT || 3000,
  api: {
    prefix: "/api",
  },
  routes: {
    default: true,
    user: true
  },
  mongo: {
    protocol: process.env.MONGO_PROTOCOL,
    url: process.env.MONGO_URL,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DB_NAME,
  },
};
