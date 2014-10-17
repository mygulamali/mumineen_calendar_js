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
    var name = (this.props.day.filler) ? "filler" : "day";
    if (this.isToday()) name += " today";
    return name;
  },
  hijriDateString: function () {
    return ArabicNumerals.fromInteger(this.props.day.hijri.date);
  },
  render: function () {
    return (
      <td className={this.className()}>
        {this.hijriDateString()}
      </td>
    );
  }
});
