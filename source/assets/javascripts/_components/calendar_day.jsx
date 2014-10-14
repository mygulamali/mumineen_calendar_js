/** @jsx React.DOM */
var CalendarDay = React.createClass({
  render: function () {
    return (
      <td>
        {this.props.day.hijri.date}
      </td>
    );
  }
});
