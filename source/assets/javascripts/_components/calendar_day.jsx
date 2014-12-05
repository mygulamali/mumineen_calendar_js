/** @jsx React.DOM */
var CalendarDay = React.createClass({
  isToday: function () {
    return (
      (this.props.day.hijri.year === this.props.today.getYear()) &&
      (this.props.day.hijri.month === this.props.today.getMonth()) &&
      (this.props.day.hijri.date === this.props.today.getDate())
    );
  },
  dayClassName: function () {
    return React.addons.classSet({
      "day": !this.props.day.filler,
      "filler": this.props.day.filler,
      "today": this.isToday()
    });
  },
  iconClassName: function () {
    var miqaatsForDay = Lazy(this.props.miqaats).findWhere({date: this.props.day.hijri.date}),
        firstMiqaat;
    if (!miqaatsForDay || this.props.day.filler) return null;
    firstMiqaat = miqaatsForDay.miqaats[0];
    return React.addons.classSet({
      "icon-sun": (firstMiqaat.priority === 1 && firstMiqaat.phase === 'day'),
      "icon-moon": (firstMiqaat.priority === 1 && firstMiqaat.phase === 'night'),
      "icon-circle": (firstMiqaat.priority != 1)
    });
  },
  hijriDateString: function () {
    return ArabicNumerals.fromInteger(this.props.day.hijri.date);
  },
  gregorianDateString: function () {
    var day = this.props.day.gregorian,
        dateString = day.date.toString();
    if (!this.props.day.filler) {
      if (this.props.day.hijri.date === 1 || day.date === 1) {
        dateString += " " + Date.getShortMonthName(day.month);
      }
      if (this.props.day.hijri.date === 1 || (day.month === 0 && day.date === 1)) {
        dateString += " " + day.year.toString();
      }
    }
    return dateString;
  },
  onDayClick: function (day) {
    if (!this.props.day.filler) {
      this.props.onDayClick(day);
    }
    return false;
  },
  render: function () {
    return (
      <td className={this.dayClassName()} onClick={this.onDayClick.bind(null, this.props.day)}>
        <div className="hijri">
          {this.hijriDateString()}
        </div>
        <div className="gregorian">
          {this.gregorianDateString()}
        </div>
        <div className="day-icon">
          <i className={this.iconClassName()}></i>
        </div>
      </td>
    );
  }
});
