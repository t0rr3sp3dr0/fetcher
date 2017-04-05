'use strict';

const redis     = require('redis'),
      mongoose  = require('mongoose'),
      aws       = require('aws-sdk');

const mongoUrl = `mongodb://mongo:27017/maratonando`;

mongoose.Promise = require('bluebird')
mongoose.connect(mongoUrl)

var redisClient = redis.createClient({
  host: 'redis',
  prefix: process.env.NODE_ENV,
});

redisClient.on('error', (err) => {
  console.log(err);
});

exports.redisClient = redisClient;

exports.createRedisClient = () => {
  return redis.createClient({
    host: 'redis',
    prefix: process.env.NODE_ENV,
  });
}

let bucket = (process.env.NODE_ENV !== 'development') ?
  'codepit' : 'codepit-dev';
exports.S3 = new aws.S3({params: {Bucket: bucket}})
