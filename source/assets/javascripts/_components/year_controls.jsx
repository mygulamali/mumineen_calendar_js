var YearControls = React.createClass({
  render: function () {
    return (
      <div className="year-controls">
        <a href="#" onClick={this.props.onYearChange.bind(null, -1)}>
          <i className="icon-minus-sign"></i>
        </a>
        <h2>{this.props.year}H</h2>
        <a href="#" onClick={this.props.onYearChange.bind(null, +1)}>
          <i className="icon-plus-sign"></i>
        </a>
      </div>
    );
  }
});
