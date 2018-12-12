const recursiveCall = require("../recursiveCall");

describe("recursive call", () => {
  it("should call api", async () => {
    const fakeAPI = async () => Promise.resolve({ data: { hi: "kris" } });
    const res = await recursiveCall(fakeAPI, 5);
    expect(res).toEqual({ data: { hi: "kris" } });
  });

  it("should call the api 3 times and save result to the db", async () => {
    let called = 0;
    const FakeApi = async () => {
      if (called === 2) {
        return Promise.resolve({ data: { hi: "kris" } });
      }
      called++;
      return Promise.reject({ error: "bye" });
    };

    const res = await recursiveCall(FakeApi, 5);
    expect(await res).toEqual({ data: { hi: "kris" } });
  });

  it("should call the api 2 times, call again when it goes to the error branch", async () => {
    let called = 0;
    const FakeApi = async () => {
      if (called === 100) {
        return Promise.resolve({ data: { hi: "kris" } });
      }
      called++;
      return Promise.reject({ error: "bye" });
    };

    const res = await recursiveCall(FakeApi, 3);
    expect(await res).toEqual({ error: "bye" });
  });
});
