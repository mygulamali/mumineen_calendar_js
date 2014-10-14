/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  render: function () {
    return (
      <div className="calendarFrame">
        <YearControls year={this.props.today.getYear()} />
        <TodayButton />
        <MonthControls year={this.props.today.getYear()} month={this.props.today.getMonth()} />
        <Calendar year={this.props.today.getYear()} month={this.props.today.getMonth()} />
      </div>
    );
  }
});

if (document.getElementsByTagName('main').length > 0) {
  React.renderComponent(
    <CalendarFrame today={HijriDate.fromGregorian(new Date())} />,
    document.getElementsByTagName('main').item(0)
  );
}
