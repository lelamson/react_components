'use strict';

var Card = require('../models/Card');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/cards', function (req, res) {
    Card.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  router.post('/cards', function(req, res) {
    var newCard = new Card(req.body);
    newCard.save(function (err, data) {
      if (err) {
        if(err.name === 'ValidationError') {
          console.log(err);
          return res.status(405).json(err);
        }
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  router.put('/cards/:id', function (req, res) {
    var updateCard = req.body;
    delete updateCard._id;

    Card.update({'_id': req.params.id}, updateCard, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json({msg: 'successful update'});
    });
  });

  router.delete('/cards/:id', function (req, res) {
    Card.remove({'_id': req.params.id}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json({msg: 'successful removal'});
    });
  });

};
