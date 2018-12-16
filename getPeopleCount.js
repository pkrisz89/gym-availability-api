const Horseman = require("node-horseman");

const url = "https://www.puregym.com/login/";

module.exports = () => {
  const horseman = new Horseman();
  return horseman
    .open(url)
    .type("#email", process.env.LOGIN_EMAIL)
    .type("#pin", process.env.PIN)
    .click("#login-submit")
    .keyboardEvent("keypress", 16777221)
    .waitForSelector("span.heading.heading--level3.secondary-color.margin-none")
    .text("span.heading.heading--level3.secondary-color.margin-none")
    .then((res) => {
      horseman.close();
      if (!res) {
        throw Error("No response");
      }
      return Number(res.replace(/\D/g, ""));
    });
};
