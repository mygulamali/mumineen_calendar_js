/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  render: function () {
    return (
      <div className="calendarFrame">
        <YearControls year={this.props.year} />
        <TodayButton />
        <MonthControls year={this.props.year} month={this.props.month} />
        <Calendar year={this.props.year} month={this.props.month} />
      </div>
    );
  }
});

if (document.getElementsByTagName('main').length > 0) {
  React.renderComponent(
    <CalendarFrame year="1435" month="11" />,
    document.getElementsByTagName('main').item(0)
  );
}
