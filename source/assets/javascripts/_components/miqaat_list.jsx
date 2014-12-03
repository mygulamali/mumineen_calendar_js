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
        if (this.status >= 200 && this.status < 400){
          self.setState({data: JSON.parse(this.responseText)});
        } else {
          console.log(this);
        }
      }
    };
    request.send();
    request = null;
  },
  list: function () {
    if (this.props.day && this.state.data) {
      var datum = Lazy(this.state.data).findWhere({
        date: this.props.day.hijri.date,
        month: this.props.day.hijri.month
      });
      if (datum) {
        return Lazy(datum.miqaats).map(function (miqaat) {
          return (
            <li key={miqaat.title}>{miqaat.title}</li>
          );
        }).toArray();
      } else {
        return (
          <li>There are no miqaats on this day.</li>
        );
      }
    }
  },
  render: function () {
    return (
      <div>
        <ul>
          {this.list()}
        </ul>
      </div>
    )
  }
});
