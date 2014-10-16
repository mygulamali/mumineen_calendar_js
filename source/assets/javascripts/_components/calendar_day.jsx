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
    var name = "day";
    if (this.isToday()) name += " today";
    if (this.props.day.filler) name += " filler";
    return name;
  },
  render: function () {
    return (
      <td className={this.className()}>
        {this.props.day.hijri.date}
      </td>
    );
  }
});
