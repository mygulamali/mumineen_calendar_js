/** @jsx React.DOM */
var MiqaatList = React.createClass({
  listItems: function () {
    var items = [],
        day;
    if (this.props.miqaats.length < 1)
      return (
        <li className="error">Sorry, there was a problem loading the miqaat data...</li>
      );
    if (this.props.day) {
      day = this.props.day.hijri;
      items = Lazy(this.props.miqaats).filter({
        date: day.date,
        month: day.month
      }).pluck('miqaats').flatten().map(function (miqaat) {
        if (miqaat.year && miqaat.year > day.year)
          return null;
        return (
          <li key={miqaat.title}>
            {miqaat.title}<br />
            <span className="description">{miqaat.description}</span>
          </li>
        );
      }).compact().toArray();
    }
    if (items.length < 1)
      return (
        <li className="none">There are no miqaats on this day.</li>
      );
    return items;
  },
  render: function () {
    return (
      <div className="miqaat-list">
        <ul className="miqaats">
          {this.listItems()}
        </ul>
      </div>
    )
  }
});
