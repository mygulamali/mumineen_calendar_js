var Modal = React.createClass({
  hijriDateString: function () {
    if (this.props.day && this.props.day.hijri) {
      var day = this.props.day.hijri;
      return day.date.toString() + " " + HijriDate.getMonthName(day.month) + " " + day.year.toString() + "H";
    }
  },
  gregorianDateString: function () {
    if (this.props.day && this.props.day.gregorian) {
      var day = this.props.day.gregorian;
      return day.date.toString() + " " + Date.getMonthName(day.month) + " " + day.year.toString() + "AD";
    }
  },
  render: function () {
    return (
      <div className="modal" id={this.props.modalId}>
        <input className="modal-state" id="modal-checkbox" type="checkbox" />
        <div className="modal-window">
          <div className="modal-inner">
            <label className="modal-close" htmlFor="modal-checkbox"></label>
            <h3>{this.hijriDateString()}</h3>
            <h4>{this.gregorianDateString()}</h4>
            <MiqaatList {...this.props} />
          </div>
        </div>
      </div>
    );
  }
});
