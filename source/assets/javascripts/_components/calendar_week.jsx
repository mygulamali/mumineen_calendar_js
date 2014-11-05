/** @jsx React.DOM */
var CalendarWeek = React.createClass({
  days: function () {
    var today = this.props.today,
        onDayClick = this.props.onDayClick;
    return Lazy(this.props.week).map(function (day) {
      var key = [day.hijri.year, day.hijri.month, day.hijri.date].join("-");
      return (
        <CalendarDay key={key} day={day} today={today} onDayClick={onDayClick} />
      );
    }).toArray();
  },
  render: function () {
    return (
      <tr>
        {this.days()}
      </tr>
    );
  }
});
