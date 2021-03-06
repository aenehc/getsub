import React from 'react/addons';
import _ from 'underscore';
let CX    = React.addons.classSet;

let Component = React.createClass({

  getInitialState: function () {
    return { state: false, list: [] };
  },

  componentWillMount: function () {
    Event.on('selectSubModal', this.eventListener);
  },

  eventListener: function (state, resultList) {
    if (state) {
      Event.emit('smoke', true);
      this.setState({ state: state, list: resultList });
    }
    else {
      this.onClose();
    }
  },


  handleClick: function (e) {
    window.location = e.target.getAttribute('data-link');
    this.onClose();

    e.stopPropagation();
    e.preventDefault();
  },

  onClose: function () {
    Event.emit('smoke', false);
    this.setState({ state: false, list: [] });
  },

  render: function () {

    let modalClasses = CX({
      'modal': true,
      'flex': true,
      'flex-align-center': true,
      'flex-just-center': true,
      'bg-dark-grey': true,
      'z4': true,
      'col-5': true,
      'show': this.state.state
    });

    return (
      <div className={modalClasses}>
        <div className="flex flex-col flex-1">
            <div className="flex-1 bg-dark-ghost-grey p2">
              <h3 className="white pt1 pr1 pb1 mt0 mb0">Select a subtitle:</h3>
            </div>
            <div className="flex-2 p1">
              <ul className="list p0 mb0 scroll-y">
              {this.state.list.map((sub, index) => {
                return <li key={index} onClick={this.handleClick} data-link={sub.subDownloadLink} className="a--panel list-reset white p1 bd-dark-ghost-grey white">{sub.subFileName}</li>
              })}
              </ul>
            </div>
        </div>
      </div>
    );
  }

});


export default Component;
