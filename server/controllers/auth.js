const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { JWT_KEY } = require('../config');
const Tokens = require('../models/validTokens');

class Auth {
  /**
   * Handles user login action
   * Generates a jwt for the user
   */
  async login(req, res, next) {
    try {
      let token;
      const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
      });
      if (!user) {
        return res.status(401).send({
          message: 'Authentication Failed. Incorrect email or password'
        });
      }

      const checkIfUserHasExistingToken = await Tokens.findOneAndDelete({
        userId: user.id
      });

      token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        JWT_KEY,
        { expiresIn: '5h' }
      );
      await Tokens.create({ userId: user.id, token });

      res.status(200).json({
        message: 'Authentication was successful',
        token
      });
    } catch (error) {
      next(error);
    }
  }

  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(409).send({
          message: 'User Email already in use'
        });
      }
      const newUser = new UserModel({ email, password });
      await newUser.save();
      res.status(200).json({
        message: 'User was successfully created. Login'
      });
    } catch (error) {
      next(error);
    }
  }

  //logs user out
  async logout(req, res, next) {
    try {
      await Tokens.findOneAndDelete({ userId: req.user.id });

      res.status(200).send({
        message: 'User logged out'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Auth();
