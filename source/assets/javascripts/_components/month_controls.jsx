/** @jsx React.DOM */
var MonthControls = React.createClass({
  render: function () {
    var monthName = HijriDate.getMonthName(this.props.month);
    return (
      <div className="monthControls">
        <button onClick={this.props.previousMonth}>Prev</button>
        <h3>{monthName}</h3>
        <button onClick={this.props.nextMonth}>Next</button>
      </div>
    );
  }
});
