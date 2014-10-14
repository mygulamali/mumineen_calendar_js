/** @jsx React.DOM */
var MonthControls = React.createClass({
  render: function () {
    var monthName = HijriDate.getMonthName(this.props.month);
    return (
      <div className="monthControls">
        <a href="#">Prev</a>
        <h3>{ monthName }</h3>
        <a href="#">Next</a>
      </div>
    );
  }
});
