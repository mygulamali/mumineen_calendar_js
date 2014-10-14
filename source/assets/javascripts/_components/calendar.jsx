/** @jsx React.DOM */
var Calendar = React.createClass({
  render: function () {
    var calendar = new HijriCalendar(this.props.year, this.props.month),
        index = 0;
        weeks = Lazy([]).concat(
          calendar.previousDays(),
          calendar.days(),
          calendar.nextDays()
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
