const express = require('express');
const {hello} = require('./controlers.js');
const userRouter = express.Router();

userRouter.post('/pdf', hello);

module.exports = userRouter;
