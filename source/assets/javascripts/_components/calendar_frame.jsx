/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  getInitialState: function () {
    return {
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    };
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
        <TodayButton today={this.props.today} />
        <MonthControls month={this.state.calendar.getMonth()} />
        <Calendar calendar={this.state.calendar} />
      </div>
    );
  }
});
