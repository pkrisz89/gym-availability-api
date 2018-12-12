const Memoize = require("../memoize");

describe("Memoize function results", () => {
  function returnObject() {
    const res = { a: "1", b: 2 };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 100);
    });
  }

  beforeEach(() => {
    jest.spyOn(Memoize, "memoize");
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Memoize.clearCache();
  });

  it("should have empty cache", () => {
    expect(Memoize.cache).toEqual({});
  });

  it("should cache the result and return it", async () => {
    const res = await Memoize.getResult(returnObject);

    expect(Memoize.cache.returnObject.expiry).toBeDefined();
    expect(res).toEqual({ a: "1", b: 2 });
    expect(Memoize.memoize).toHaveBeenCalledTimes(1);
  });

  it("should re-cache the value if cache is expired", async () => {
    Memoize.cache.returnObject = {
      expiry: "1900-01-01",
      result: { a: "1", b: 2 },
    };

    const res = await Memoize.getResult(returnObject);

    expect(res).toEqual({ a: "1", b: 2 });
    expect(Memoize.memoize).toHaveBeenCalled();
  });

  it("should return the value if cache is valid", async () => {
    Memoize.cache.returnObject = {
      expiry: "2200-01-01",
      result: { a: "1", b: 2 },
    };

    const res = await Memoize.getResult(returnObject);

    expect(res).toEqual({ a: "1", b: 2 });
    expect(Memoize.memoize).not.toHaveBeenCalled();
  });
});
