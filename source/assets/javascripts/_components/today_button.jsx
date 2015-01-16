var TodayButton = React.createClass({
  render: function () {
    return (
      <div className="today-button">
        <button onClick={this.props.onClick}>Today</button>
      </div>
    );
  }
});
