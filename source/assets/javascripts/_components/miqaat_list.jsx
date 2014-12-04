/** @jsx React.DOM */
var MiqaatList = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function () {
    var request = new XMLHttpRequest(),
        self = this;
    request.open('GET', '/data/miqaats.json', true);
    request.onreadystatechange = function() {
      if (this.readyState === this.DONE){
        if (this.status >= 200 && this.status < 400) {
          self.setState({data: JSON.parse(this.responseText)});
        } else {
          console.log(this);
        }
      }
    };
    request.send();
    request = null;
  },
  listItems: function () {
    var items = [];
    if (this.state.data.length < 1)
      return (
        <li className="error">Sorry, there was a problem loading the miqaat data...</li>
      );
    if (this.props.day) {
      items = Lazy(this.state.data).filter({
        date: this.props.day.hijri.date,
        month: this.props.day.hijri.month
      }).pluck('miqaats').flatten().map(function (miqaat) {
        return (
          <li key={miqaat.title}>
            {miqaat.title}<br />
            <span className="description">{miqaat.description}</span>
          </li>
        );
      }).toArray();
    }
    if (items.length < 1)
      return (
        <li className="none">There are no miqaats on this day.</li>
      );
    return items;
  },
  render: function () {
    return (
      <ul className="miqaat-list">
        {this.listItems()}
      </ul>
    )
  }
});
