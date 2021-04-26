'use strict';

const express = require('express');
const router = express.Router();

const article = require('../models/article/article-model.js');
// Write a function to grab the model

function getModel(req, res, next) {
  let model = req.params.model; // This will be food, books, whatever is after /api/v1

  // How can we get the right model into those functions?
  // Well,l middleware is really good at letting us put data on the request object
  // Lets do that and then get get ourselves back into the route handler
  switch (model) {
    case 'article':
      req.model = article;
      next();
      return;
    // case "books":
    //   req.model = books;
    //   next();
    //   return;
    default:
      next('Invalid Model');
      return;
  }
}

router.param('model', getModel);

router.get('/:model', handleGetAll);
router.post('/:model', handleCreateOne);

router.get('/demo', demoRouteHandler);

function demoRouteHandler(req, res) {
  res.status(200).send('I work');
}
async function handleGetAll(req, res, next) {
  console.log('hit');
  let data = await req.model.read();

  // let output = {
  //   results: data,
  // };

  res.status(200).json(data);
}

async function handleCreateOne(req, res) {
  const record = await req.model.create(req.body);
  res.status(200).json(record);
}

module.exports = router;
