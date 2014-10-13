/** @jsx React.DOM */
var Calendar = React.createClass({
  render: function () {
    return (
      <div className="calendar">
        This is the calendar.
      </div>
    );
  }
});

React.renderComponent(
  <Calendar />,
  document.getElementsByTagName('main').item(0)
);
