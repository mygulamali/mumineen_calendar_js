var MonthControls = React.createClass({
  render: function () {
    return (
      <div className="month-controls">
        <a href="#" className="prev" onClick={this.props.onMonthChange.bind(null, -1)}>
          <i className="icon-chevron-sign-left"></i>
        </a>
        <h3>{HijriDate.getMonthName(this.props.month)}</h3>
        <a href="#" className="next" onClick={this.props.onMonthChange.bind(null, +1)}>
          <i className="icon-chevron-sign-right"></i>
        </a>
      </div>
    );
  }
});
