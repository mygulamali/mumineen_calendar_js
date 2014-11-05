/** @jsx React.DOM */
var CalendarFrame = React.createClass({
  statics: {
    modalId: "modal"
  },
  getInitialState: function () {
    return {
      day: null,
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    };
  },
  navigateToToday: function () {
    this.setState({
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    });
  },
  changeMonth: function (monthChange) {
    this.setState({
      calendar: (monthChange < 0) ? this.state.calendar.previousMonth() : this.state.calendar.nextMonth()
    });
  },
  changeYear: function (yearChange) {
    this.setState({
      calendar: (yearChange < 0) ? this.state.calendar.previousYear() : this.state.calendar.nextYear()
    });
  },
  showModal: function (day) {
    this.setState({day: day});
    document.getElementById(CalendarFrame.modalId).getElementsByTagName("input").item(0).checked = true;
  },
  render: function () {
    return (
      <div className="calendar-frame">
        <div className="year-row">
          <YearControls
            year={this.state.calendar.getYear()}
            onYearChange={this.changeYear}
          />
          <TodayButton onClick={this.navigateToToday} />
        </div>
        <div className="month-row">
          <MonthControls
            month={this.state.calendar.getMonth()}
            onMonthChange={this.changeMonth}
          />
        </div>
        <Calendar calendar={this.state.calendar} today={this.props.today} modalId={CalendarFrame.modalId} onDayClick={this.showModal} />
        <Modal modalId={CalendarFrame.modalId} day={this.state.day} />
      </div>
    );
  }
});
