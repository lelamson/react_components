'use strict';

var React = require('react');
var CardList = require('./components/cards_list.jsx');
var CardForm = require('./components/card_form.jsx');
var request = require('superagent');

// var testCards = [
//   {_id: 100, spell: "Fireball", color: "Red", cost: 2},
//   {_id: 200, spell: "Giant", color: "Green", cost: 3}
// ];

var App = React.createClass({
  getInitialState: function() {
    return {cards: []};
  },

  getCardsFromServer: function() {
    request
      .get('/magic/cards')
      .end(function (err, res) {
        if (err) return console.log(err);

        this.setState({cards: res.body});
      }.bind(this));
  },

  saveCard: function(value) {
    var newCards = this.state.cards;
    request
      .post('/magic/cards', value)
      .end(function (err, res) {
        if (err) return console.log(err);

        newCards.push(res.body);
        this.setState({cards: newCards});
    }.bind(this));
  },

  componentDidMount: function () {
    this.getCardsFromServer();
    setInterval(this.getCardsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <section>
        <label>Cards:</label>
        <CardList data={this.state.cards} />
        <br></br>
        <CardForm onSubmit={this.saveCard} />
      </section>
    )
  }
});

React.render(
  <App pollInterval={3000} />,
  document.getElementsByTagName("article")[0]
);
