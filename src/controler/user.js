/**
 * 只专注于数据
 */
const {execFindOne} = require('../tools/appTools')
const {UserModel} = require('../../db/model')
const login = (username, password) => {
	return execFindOne(UserModel, username, password)
  }

  module.exports = {
	  login
  }