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
    request
      .post('/magic/cards', newCard)
      .end(function (err, res) {
        if (err) return console.log(err);

        this.setState({card: []});
      }.bind(this));
  },

  render: function() {
    return (
      <form onChange={this.handleChange} onSubmit={this.saveCard} >
        <input type="text" placeholder="Spell Name" ref="spell" value={this.state.card.spell} />
        <input type="text" placeholder="Color" ref="color" value={this.state.card.color} />
        <input type="text" placeholder="Cost 1-4" ref="cost" value={this.state.card.cost} />
        <input type="submit" value="Create Card" />
      </form>
    )
  }
});
