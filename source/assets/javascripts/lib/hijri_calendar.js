var HijriCalendar = (function () {
  "use strict";

  var MIN_CALENDAR_YEAR = 1000,
      MAX_CALENDAR_YEAR = 3000;

  var hijriCalendar = function (year, month) {
    this.year = year;
    this.month = month;
  };

  hijriCalendar.prototype.getYear = function () {
    return this.year;
  };

  hijriCalendar.prototype.getMonth = function () {
    return this.month;
  };

  hijriCalendar.getMinYear = function () {
    return MIN_CALENDAR_YEAR;
  };

  hijriCalendar.getMaxYear = function () {
    return MAX_CALENDAR_YEAR;
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
