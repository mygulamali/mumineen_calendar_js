/** @jsx React.DOM */
var MonthControls = React.createClass({
  render: function () {
    return (
      <div className="monthControls">
        <button onClick={this.props.onMonthChange.bind(null, -1)}>Prev</button>
        <h3>{HijriDate.getMonthName(this.props.month)}</h3>
        <button onClick={this.props.onMonthChange.bind(null, +1)}>Next</button>
      </div>
    );
  }
});
