/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  getInitialState: function () {
    return {
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    };
  },
  render: function () {
    return (
      <div className="calendarFrame">
        <YearControls year={this.state.calendar.getYear()} />
        <TodayButton today={this.props.today} />
        <MonthControls month={this.state.calendar.getMonth()} />
        <Calendar calendar={this.state.calendar} />
      </div>
    );
  }
});
