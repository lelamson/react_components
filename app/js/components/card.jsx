'use strict';

var React = require('react');

//Card
module.exports = React.createClass({
  render: function () {
    return <li>{this.props.data.spell} - {this.props.data.color}</li>;
  }
});
