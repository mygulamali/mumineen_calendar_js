/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  render: function () {
    return (
      <div className="calendar-frame">
        This is the calendar frame.
      </div>
    );
  }
});

React.renderComponent(
  <CalendarFrame />,
  document.getElementsByTagName('main').item(0)
);
