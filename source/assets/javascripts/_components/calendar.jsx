/** @jsx React.DOM */
var Calendar = React.createClass({
  render: function () {
    var index = -1,
        weeks = Lazy([]).concat(
          this.props.calendar.previousDays(),
          this.props.calendar.days(),
          this.props.calendar.nextDays()
        ).chunk(7).map(function (week) {
          index += 1;
          return (
            <CalendarWeek key={index} week={week} />
          );
        }).toArray();

    return (
      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </table>
      </div>
    );
  }
});
