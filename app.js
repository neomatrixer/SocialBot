const puppeteer = require('puppeteer');
const topics = require('./models/topic');
const test = require('./models/test');

console.log('started')
var testValue = test.testFunction();
console.log(testValue);
//var topicList = topics.getTopicList();
//console.log(topicList);