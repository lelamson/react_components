'use strict';

var React = require('react');
var request = require('superagent');

//Card Form
module.exports = React.createClass({
  getInitialState: function () {
    return{card: []};
  },

  handleChange: function(event) {
    var copy = this.state.card;
    copy =  event.target.value;
    this.setState({card: copy});
  },

  saveCard: function(event) {
    event.preventDefault();
    var newCard = {};
    newCard.spell = this.refs.spell.getDOMNode().value;
    newCard.color = this.refs.color.getDOMNode().value;
    newCard.cost = this.refs.cost.getDOMNode().value;
    this.props.onSubmit(newCard);
    this.refs.spell.getDOMNode().value = '';
    this.refs.color.getDOMNode().value = '';
    this.refs.cost.getDOMNode().value = '';
  },

  render: function() {
    return (
      <form onChange={this.handleChange} onSubmit={this.saveCard} >
        <input type="text" placeholder="Spell Name" ref="spell" />
        <input type="text" placeholder="Color" ref="color" />
        <input type="text" placeholder="Cost 1-4" ref="cost" />
        <input type="submit" value="Create Card" />
      </form>
    )
  }
});
