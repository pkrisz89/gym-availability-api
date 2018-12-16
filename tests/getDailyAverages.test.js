const GetDailyAverages = require("../getDailyAverages");
const mockData = require("./mockData");
const testResults = require("./getDailyAveragestestresults");

describe("Calculate daily averages", () => {
  it("should filter out null values", () => {
    expect(mockData[12].count).toEqual(null);
    const filtered = GetDailyAverages.filterNull(mockData);
    expect(filtered[12].count).toEqual(51);
  });

  it("should group the data by days", () => {
    const filtered = GetDailyAverages.filterNull(mockData);
    const grouped = GetDailyAverages.groupByDays(filtered);

    expect(grouped).toEqual(testResults.grouped);
  });

  it("should group data by half hours within days", () => {
    const filtered = GetDailyAverages.filterNull(mockData);
    const grouped = GetDailyAverages.groupByDays(filtered);
    const groupedByTime = GetDailyAverages.groupByHalfHour(grouped);

    expect(groupedByTime).toEqual(testResults.groupedByHalfHours);
  });

  it("should calculate averages", () => {
    const filtered = GetDailyAverages.filterNull(mockData);
    const grouped = GetDailyAverages.groupByDays(filtered);
    const groupedByTime = GetDailyAverages.groupByHalfHour(grouped);
    const average = GetDailyAverages.calculateAverage(groupedByTime);

    expect(average).toEqual(testResults.averageCount);
  });
});
