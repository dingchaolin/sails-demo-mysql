/**
 * Dcl_user.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'dcl_user',
  adapter: 'mysql',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id:{columnName: 'uid'},email:{},pwd:{},nicheng:{},updtime:{},createtime:{}
  }
};

