'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://192.168.1.3:9000/"',
  BASE_API: '"http://10.242.23.33:9000/"',
})
