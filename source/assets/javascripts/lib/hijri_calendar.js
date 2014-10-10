var HijriCalendar = (function () {
  "use strict";

  var MIN_CALENDAR_YEAR = 1000,
      MAX_CALENDAR_YEAR = 3000;

  var hijriCalendar = function (year, month, iso8601) {
    this.year = year;
    this.month = month;
    this.iso8601 = iso8601 ? iso8601 : false;
  };

  hijriCalendar.prototype.getYear = function () {
    return this.year;
  };

  hijriCalendar.prototype.getMonth = function () {
    return this.month;
  };

  hijriCalendar.prototype.isISO = function () {
    return this.iso8601;
  };

  hijriCalendar.getMinYear = function () {
    return MIN_CALENDAR_YEAR;
  };

  hijriCalendar.getMaxYear = function () {
    return MAX_CALENDAR_YEAR;
  };

  // return day of week for the specified date
  hijriCalendar.prototype.dayOfWeek = function (date) {
    var hijriDate = new HijriDate(this.year, this.month, date),
        offset = this.iso8601 ? -0.5 : 0.5;
    return (hijriDate.toAJD() + offset) % 7;
  };

  // return Hijri Calendar object for the previous month
  hijriCalendar.prototype.previousMonth = function () {
    var year = (this.month === 0) ? (this.year - 1) : this.year,
        month = (this.month === 0) ? 11 : (this.month - 1);
    return new hijriCalendar(year, month);
  };

  // return Hijri Calendar object for the next month
  hijriCalendar.prototype.nextMonth = function () {
    var year = (this.month === 11) ? (this.year + 1) : this.year,
        month = (this.month === 11) ? 0 : (this.month + 1);
    return new hijriCalendar(year, month);
  };

  // return Hijri Calendar object for the previous year
  hijriCalendar.prototype.previousYear = function () {
    var year = (this.year === MIN_CALENDAR_YEAR) ? MIN_CALENDAR_YEAR : (this.year - 1);
    return new hijriCalendar(year, this.month);
  };

  // return Hijri Calendar object for the next year
  hijriCalendar.prototype.nextYear = function () {
    var year = (this.year === MAX_CALENDAR_YEAR) ? MAX_CALENDAR_YEAR : (this.year + 1);
    return new hijriCalendar(year, this.month);
  };

  return hijriCalendar;
})();
