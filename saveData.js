const { MongoClient } = require("mongodb");

const dbName = "gym-app";

module.exports = async function(count) {
  let client;

  try {
    client = await MongoClient.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    );
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const data = { date: new Date(), count };

    await db.collection("data").insertOne(data);
  } catch (err) {
    console.log(err);
  }

  // Close connection
  client.close();
};
