const cron = require("node-cron");
const express = require("express");
const getPeopleCount = require("./getPeopleCount");
const saveData = require("./saveData");
const getAllData = require("./getAllData");
const Memoize = require("./memoize");
const recursiveCall = require("./recursiveCall");
const GetDailyAverages = require("./getDailyAverages");

const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 9000;

cron.schedule("0,15,30,45 * * * *", async () => {
  // running every minute 0,15,30,45
  const data = await recursiveCall(getPeopleCount, 5);
  await saveData(data);
});

// TODO:Clear the db every 1st of month...

app.get("/", async (req, res) => {
  const data = await Memoize.getResult(getAllData);
  const formatted = await GetDailyAverages.getResult(data);
  console.log(formatted);
  res.render("resultPage", { data: formatted });
});

app.listen(PORT, () => console.log(`Listening to ${PORT} in ${process.env.NODE_ENV} mode`),);
