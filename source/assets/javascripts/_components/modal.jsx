/** @jsx React.DOM */
var Modal = React.createClass({
  render: function () {
    return (
      <div className="modal" id={this.props.modalId}>
        <input className="modal-state" id="modal-checkbox" type="checkbox" />
        <div className="modal-window">
          <div className="modal-inner">
            <label className="modal-close" htmlFor="modal-checkbox"></label>
            <h1>Modal Title</h1>
            <p className="intro">Intro text lorem ipsum dolor sit ametm, quas, eaque facilis aliquid cupiditate tempora cumque ipsum accusantium illo modi commodi  minima.</p>
            <p className="body">Body text lorem ipsum dolor ipsum dolor sit sit possimus amet, consectetur adipisicing elit. Itaque, placeat, explicabo, veniam quos aperiam molestias eriam molestias molestiae suscipit ipsum enim quasi sit possimus quod atque nobis voluptas earum odit accusamus quibusdam.</p>
          </div>
        </div>
      </div>
    );
  }
});
