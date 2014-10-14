/** @jsx React.DOM */
var YearControls = React.createClass({
  render: function () {
    return (
      <div className="yearControls">
        <h2>
          <button onClick={this.props.previousYear}>Prev</button>
          {this.props.year}H
          <button onClick={this.props.nextYear}>Next</button>
        </h2>
      </div>
    );
  }
});
