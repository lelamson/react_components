'use strict';

var React = require('react');
var Card = require('./card.jsx');

//Cards List
module.exports = React.createClass({
  renderCards: function () {
    return this.props.data.map(function (card) {
      return <Card data={card} />;
    })
  },

  render: function () {
    return (
      <ul>
        {this.renderCards()}
      </ul>
    )
  }

});
