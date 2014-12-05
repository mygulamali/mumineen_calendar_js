/** @jsx React.DOM */
var Calendar = React.createClass({
  miqaats: function () {
    return Lazy(this.props.miqaats).filter({month: this.props.calendar.getMonth()}).toArray();
  },
  weeks: function () {
    var key = -1,
        today = this.props.today,
        miqaats = this.miqaats(),
        onDayClick = this.props.onDayClick;
    return Lazy(this.props.calendar.weeks()).map(function (week) {
      key += 1;
      return (
        <CalendarWeek key={key} week={week} today={today} miqaats={miqaats} onDayClick={onDayClick} />
      );
    }).toArray();
  },
  render: function () {
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
            {this.weeks()}
          </tbody>
        </table>
      </div>
    );
  }
});
