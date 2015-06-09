'use strict';

var React = require('react');
var CardList = require('./components/cards_list.jsx');
var request = require('superagent');

var testCards = [{spell: 'Fireball', color: 'Red', cost: '2'},
                  {spell: 'Giant', color: 'Green', cost: '3'}];
var App = React.createClass({
  getInitialState: function () {
    return {cards: []};
  },

  getCardsFromServer: function () {
    request
      .get('/magic/cards')
      .end(function (err, res) {
        if (err) return console.log(err);

        this.setState({cards: res.body});
      }.bind(this));
  },

  componentDidMount: function () {
    // this.getCardsFromServer();
    this.setState({cards: testCards});
    setInterval(this.getCardsFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <main>
        <label>Cards:</label>
        <CardList data={this.state.cards.spell} />
      </main>
    )
  }

});

React.render(
  <App pollInterval={2000} />,
  document.body
);
