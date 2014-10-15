/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  getInitialState: function () {
    return {
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    };
  },
  navigateToToday: function () {
    this.setState({
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    });
  },
  changeMonth: function (monthChange) {
    this.setState({
      calendar: (monthChange < 0) ? this.state.calendar.previousMonth() : this.state.calendar.nextMonth()
    });
  },
  changeYear: function (yearChange) {
    this.setState({
      calendar: (yearChange < 0) ? this.state.calendar.previousYear() : this.state.calendar.nextYear()
    });
  },
  render: function () {
    return (
      <div className="calendar-frame">
        <div className="year-row">
          <YearControls
            year={this.state.calendar.getYear()}
            onYearChange={this.changeYear}
          />
          <TodayButton onClick={this.navigateToToday} />
        </div>
        <div className="month-row">
          <MonthControls
            month={this.state.calendar.getMonth()}
            onMonthChange={this.changeMonth}
          />
        </div>
        <Calendar calendar={this.state.calendar} />
      </div>
    );
  }
});
