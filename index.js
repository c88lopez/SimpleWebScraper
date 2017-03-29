#!/usr/bin/node

var
  request = require('request')
  , cheerio = require('cheerio')
  , url = 'http://www.infobae.com'
  , newsCollection = {
    news: []
  }
;

request(url, handleResponse)

function handleResponse (error, response, body) {
  if (null != error) {
    throw error
  } else {
    $ = cheerio.load(body);

    var categoryRegex = /([a-zA-Z]+)/g;

    var newsBox;
    var titleBoxes = $('.headline');
    for (var titleBoxIndex = 0 ; titleBoxIndex < titleBoxes.length ; titleBoxIndex++) {
      var newsStruct = {
        title: '',
        image: '',
        link: '',
        category: ''
      }

      newsBox = $(titleBoxes[titleBoxIndex].parent);

      newsStruct.title = $(titleBoxes[titleBoxIndex]).text().trim();

      if ('undefined' != typeof newsBox.find('img')[0]) {
        newsStruct.image = newsBox.find('img')[0].attribs['data-original'];
      } else {
        newsStruct.image = null;
      }

      newsStruct.link = url + newsBox.find('a').attr('href');
      var linkSplitted = newsBox.find('a').attr('href').split('/');

      newsStruct.category = linkSplitted[1];
      if ('america' == newsStruct.category) {
        newsStruct.category += '/' + linkSplitted[2]
      }

      newsCollection.news.push(newsStruct);
    }

    console.log(newsCollection);
  }
}
