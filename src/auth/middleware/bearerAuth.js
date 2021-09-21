'use strict';

const { users } = require('../models/index')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    req.userId=validUser.id;
    next();

  } catch (e) {
    console.log(e);
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}