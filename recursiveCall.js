function* serviceGenerator(api) {
  yield api();
}

const CallXTimes = async (api, n) => {
  const generator = serviceGenerator(api);
  return generator.next().value.catch((err) => {
    if (n > 0) {
      return CallXTimes(api, n - 1);
    }
    return err;
  });
};

module.exports = CallXTimes;
