/** @jsx React.DOM */
var YearControls = React.createClass({
  render: function () {
    return (
      <div className="yearControls">
        <h2>
          <button onClick={this.props.onYearChange.bind(null, -1)}>Prev</button>
          {this.props.year}H
          <button onClick={this.props.onYearChange.bind(null, +1)}>Next</button>
        </h2>
      </div>
    );
  }
});
