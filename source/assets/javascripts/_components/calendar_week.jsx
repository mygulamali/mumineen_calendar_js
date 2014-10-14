/** @jsx React.DOM */
var CalendarWeek = React.createClass({
  render: function () {
    var days = Lazy(this.props.week).map(function (day) {
      return (
        <CalendarDay key={[day.hijri.year, day.hijri.month, day.hijri.date].join("-")} day={day} />
      );
    }).toArray();

    return (
      <tr>
        {days}
      </tr>
    );
  }
});
