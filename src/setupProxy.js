const express = require('express');
const chatHandler = require('../api/chat');

module.exports = function (app) {
  app.post('/api/chat', express.json(), (req, res) => {
    chatHandler(req, res);
  });
};
