/** @jsx React.DOM */
var CalendarDay = React.createClass({
  isToday: function () {
    return (
      (this.props.day.hijri.year === this.props.today.getYear()) &&
      (this.props.day.hijri.month === this.props.today.getMonth()) &&
      (this.props.day.hijri.date === this.props.today.getDate())
    );
  },
  className: function () {
    return React.addons.classSet({
      "day": !this.props.day.filler,
      "filler": this.props.day.filler,
      "today": this.isToday()
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
  render: function () {
    return (
      <td className={this.className()}>
        <div className="hijri">
          {this.hijriDateString()}
        </div>
        <div className="gregorian">
          {this.gregorianDateString()}
        </div>
      </td>
    );
  }
});
