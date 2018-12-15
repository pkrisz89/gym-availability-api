const moment = require("moment");

class Memoize {
  constructor() {
    this.cache = {};
    this.getResult = this.getResult.bind(this);
    this.memoize = this.memoize.bind(this);
  }

  static setExpiry() {
    return moment().add(1, "d");
  }

  isExpired(functionName) {
    return moment().isAfter(this.cache[functionName].expiry, "date");
  }

  async memoize(fn) {
    const result = await fn.call(this);

    const cachableObj = {
      [fn.name]: {
        result,
        expiry: Memoize.setExpiry(),
      },
    };

    this.cache = { ...this.cache, ...cachableObj };
  }

  async getResult(fn) {
    if (!this.cache || !this.cache[fn.name] || this.isExpired(fn.name)) {
      await this.memoize(fn);
    }

    return this.cache[fn.name].result;
  }

  clearCache() {
    this.cache = {};
  }
}

module.exports = new Memoize();
