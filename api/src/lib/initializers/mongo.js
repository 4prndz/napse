import mongoose from "mongoose";

export const setupMongo = async ({ mongo }) => {
  const { protocol, url, username, password, database } = mongo;

  const uri = `${protocol}${username}:${encodeURIComponent(password)}@${url}/${database}?authSource=admin`;

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
