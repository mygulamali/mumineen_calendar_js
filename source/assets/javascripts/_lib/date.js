Date.prototype.monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// class methods

Date.getMonthName = function (month) {
  return Date.prototype.monthNames[month];
};

Date.getShortMonthName = function (month) {
  return Date.getMonthName(month).substr(0, 3);
};

// instance methods

Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
};

Date.prototype.getShortMonthName = function () {
  return this.getMonthName().substr(0, 3);
};
