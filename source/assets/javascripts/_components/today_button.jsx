/** @jsx React.DOM */
var TodayButton = React.createClass({
  render: function () {
    return (
      <div className="todayButton">
        <button onClick={this.props.onClick}>Today</button>
      </div>
    );
  }
});
