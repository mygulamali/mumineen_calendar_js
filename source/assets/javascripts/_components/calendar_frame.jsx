/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  render: function () {
    return (
      <div className="calendarFrame">
        <YearControls />
        <TodayButton />
        <MonthControls />
        <Calendar />
      </div>
    );
  }
});

if (document.getElementsByTagName('main').length > 0) {
  React.renderComponent(
    <CalendarFrame />,
    document.getElementsByTagName('main').item(0)
  );
}
