'use strict';

var React = require('react');

//Card Form
module.exports = React.createClass({
  render: function () {
    return (
      <form >
        <input type="text" placeholder="Spell Name" />
        <input type="text" placeholder="Color" />
        <input type="text" placeholder="Cost 1-4" />
        <input type="submit" value="Create Card" />
      </form>
    )
  }
});
