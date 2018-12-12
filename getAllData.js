const { MongoClient } = require("mongodb");

const dbName = "gym-app";

module.exports = async function getAllData() {
  let client;

  try {
    client = await MongoClient.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true },
    );

    const db = client.db(dbName);

    const result = await db
      .collection("data")
      .find()
      .toArray();

    return await result;
  } catch (err) {
    return err;
  }
};
