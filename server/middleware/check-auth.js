const getToken = require('./getToken');
const jwt = require('jsonwebtoken');
// const {}
const mongoose = require('mongoose');
const { JWT_KEY } = require('../config');
const Tokens = require('../models/validTokens');

async function checkAuthorization(req, res, next) {
  try {
    const token = getToken(req);
    //if there is no token in the request header, body or query
    if (!token) {
      return res.status(401).send({
        message: 'Unauthorized'
      });
    }

    const decoded = jwt.verify(token, JWT_KEY);

    const validToken = await Tokens.findOne({
      userId: decoded.id
    });
    if (!validToken) {
      return res.status(401).send({
        message: 'Unauthorized'
      });
    }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkAuthorization;
