const cron = require("node-cron");
const express = require("express");
const moment = require("moment");
const getPeopleCount = require("./getPeopleCount");
const saveData = require("./saveData");
const getAllData = require("./getAllData");
const { getResult } = require("./memoize");
const recursiveCall = require("./recursiveCall");

const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 9000;

cron.schedule("0,15,30,45 * * * *", async () => {
  // running every minute 0,15,30,45
  const data = await recursiveCall(getPeopleCount, 5);
  await saveData(data);
});

app.get("/", async (req, res) => {
  const data = await getResult(getAllData);
  const formatted = data.map(({ date, count }) => ({
    date: moment(date).format("DD/MM/YYYY HH:mm"),
    count,
  }));
  res.render("resultPage", { data: formatted });
});

app.listen(PORT, () => console.log(`Listening to ${PORT} in ${process.env.NODE_ENV} mode`),);
