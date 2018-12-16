const moment = require("moment");

class GetDailyAverages {
  static filterNull(data) {
    return data.filter(({ count }) => count !== null);
  }

  static groupByDays(data) {
    const days = Array.from(Array(7).keys());
    const grouped = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };

    days.forEach((dayValue) => {
      data.forEach((item) => {
        if (moment(item.date).day() === dayValue) {
          grouped[moment.weekdays(dayValue)].push(item);
        }
      });
    });

    return grouped;
  }

  static groupByHalfHour(data) {
    const hours = Array.from(Array(24).keys());
    const days = Object.keys(data);
    const grouped = {};

    days.forEach((day) => {
      grouped[day] = {};
      data[day].forEach((item) => {
        hours.forEach((hour) => {
          const date = moment(item.date);

          if (date.hours() === hour && date.minutes() === 0) {
            if (
              !Object.prototype.hasOwnProperty.call(grouped[day], `${hour}:00`)
            ) {
              grouped[day][`${hour}:00`] = [];
            }
            grouped[day][`${hour}:00`].push(item.count);
          }

          if (date.hours() === hour && date.minutes() === 30) {
            if (
              !Object.prototype.hasOwnProperty.call(grouped[day], `${hour}:30`)
            ) {
              grouped[day][`${hour}:30`] = [];
            }

            grouped[day][`${hour}:30`].push(item.count);
          }
        });
      });
    });

    return grouped;
  }

  static calculateAverage(data) {
    const days = Object.keys(data);
    const averages = {};

    days.forEach((day) => {
      averages[day] = {};
      const times = Object.keys(data[day]);

      times.forEach((time) => {
        const total = data[day][time].reduce(
          (curr, acc) => Number(curr) + Number(acc),
          0,
        );
        const avg = Math.ceil(total / data[day][time].length);
        averages[day][time] = avg;
      });
    });

    return averages;
  }

  static getResult(data) {
    const filtered = GetDailyAverages.filterNull(data);
    const grouped = GetDailyAverages.groupByDays(filtered);
    const groupedByTime = GetDailyAverages.groupByHalfHour(grouped);
    return GetDailyAverages.calculateAverage(groupedByTime);
  }
}

module.exports = GetDailyAverages;
