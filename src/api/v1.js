'use strict';

const express = require('express');
const router = express.Router();

const article = require('../models/article/article-model.js');
const modelFinder = require('../middleware/model.js');
// Write a function to grab the model

router.param('model', modelFinder);

router.get('/:model', handleGetAll);
router.post('/:model', handleCreateOne);

router.get('/demo', demoRouteHandler);

function demoRouteHandler(req, res) {
  res.status(200).send('I work');
}
async function handleGetAll(req, res, next) {
  console.log('hit');
  let records = await req.model.get();
  res.status(200).json(records);

  // let output = {
  //   results: data,
  // };
}

async function handleCreateOne(req, res) {
  let record = await req.model.create(req.body);
  res.status(200).json(record);
}

module.exports = router;
