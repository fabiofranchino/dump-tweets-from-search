var keyword = '%23may1reboot'
var base = 'https://twitter.com/i/search/timeline?f=tweets&vertical=default&q=' + keyword + '&include_available_features=1&include_entities=1&reset_error_state=false&max_position='

var request = require('request')
var cheerio = require('cheerio')
var low = require('lowdb')

var db = low('db.json')

db.defaults({items: []}).write()

var count = 0

function req (url) {
  request(url, function (error, response, body) {
    if (error) return console.log({error: 'could not retrieve page'})

    var src = JSON.parse(body)

    var bd = src.items_html
    var min = src.min_position

    var $ = cheerio.load(bd)

    var items = $('.js-stream-item')

    console.log('items:', count, items.length)

    items.each(function (i, e) {
      var id = $(this).data('item-id')

      var type = $(this).data('item-type')

      var cnt = $(this).children().first()

      var perm = cnt.data('permalink-path')

      var screen = cnt.data('screen-name')

      var name = cnt.data('name')

      var time = cnt.find('.tweet-timestamp').attr('title')

      var text = cnt.find('.js-tweet-text').text()

      var reply = cnt.find('.ProfileTweet-action--reply > span > span').text().trim()

      var retweet = cnt.find('.ProfileTweet-action--retweet > span > span').text().trim()

      var favorite = cnt.find('.ProfileTweet-action--favorite > span > span').text().trim()

      var dup = db.get('items')
        .find({ id: id }).value()

      // we are going to add the tweet in the db only if it doesn't exist in the data store
      if (!dup) {
        console.log(id, 'not found')
        db.get('items').push({
          id: id,
          type: type,
          screenName: screen,
          name: name,
          perm: perm,
          time: time,
          text: text,
          reply: reply,
          retweet: retweet,
          favorite: favorite
        })
        .write()
      }
    })

    if (items.length > 0) {
      req(base + min)
      count++
    } else {
      console.log('Hey it\'s finished')

      // just a quick check whether there's a tweet more that once
      for (var i = 0; i < db.length; ++i) {
        var e = db[i].id
        for (var j = i + 1; j < db.length; ++j) {
          var a = db[j].id
          if (a === e) {
            console.log('there\'s a duplicated id', a)
          }
        }
      }
    }
  })
}

req(base)
