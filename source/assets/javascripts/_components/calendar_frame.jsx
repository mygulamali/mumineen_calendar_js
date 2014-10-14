/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  getInitialState: function () {
    return {
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    };
  },
  thisMonth: function () {
    this.setState({
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    });
  },
  previousMonth: function () {
    this.setState({
      calendar: this.state.calendar.previousMonth()
    });
  },
  nextMonth: function () {
    this.setState({
      calendar: this.state.calendar.nextMonth()
    });
  },
  previousYear: function () {
    this.setState({
      calendar: this.state.calendar.previousYear()
    });
  },
  nextYear: function () {
    this.setState({
      calendar: this.state.calendar.nextYear()
    });
  },
  render: function () {
    return (
      <div className="calendarFrame">
        <YearControls
          year={this.state.calendar.getYear()}
          previousYear={this.previousYear}
          nextYear={this.nextYear}
        />
        <TodayButton today={this.thisMonth} />
        <MonthControls
          month={this.state.calendar.getMonth()}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
        />
        <Calendar calendar={this.state.calendar} />
      </div>
    );
  }
});
