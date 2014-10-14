/** @jsx React.DOM */
var YearControls = React.createClass({
  render: function () {
    return (
      <div className="yearControls">
        <h2>
          <a href="#">Prev</a>
          {this.props.year}H
          <a href="#">Next</a>
        </h2>
      </div>
    );
  }
});
