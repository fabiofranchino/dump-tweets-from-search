# Dump tweets from search

### Installation

```
npm install
```

### Config

Edit the first variable in index.js with your preferred search key:

```javascript
var keyword = '%23may1reboot'
```

now it will search for #may1reboot hashtag

### Run

```
node index.js
```

It will collect every tweets found in the search saving on a local db.json file.

You can run multiple times to updates the db.json with fresh search results. The script actually check for existing of not tweets in the stored database.

The object structure for each tweet is something like:

```jso
{
      "id": "859460573242638341",
      "type": "tweet",
      "screenName": "philipamour",
      "name": "Philip Amour",
      "perm": "/philipamour/status/859460573242638341",
      "time": "10:32 - 2 mag 2017",
      "text": "Hello Twitter people. In case you missed it, I have redesigned and coded my new portfolio as part of #May1Reboot https://www.philipamour.com ",
      "reply": "2 risposte",
      "retweet": "1 Retweet",
      "favorite": "2 Mi piace"
}
```



Have fun!