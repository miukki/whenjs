var when = require('./bower_components/when')
var when_keys = require('./bower_components/when/keys')



function getUserProfile() {
  return when({
    name: 'jack',
    gender: 'M'
  }).delay(1000)
}

function getFriends() {
  return when(['A', 'B', 'C']).delay(2000)
}

// create a promise
var viewData = when_keys.all({
  userId: 1,
  user: getUserProfile(),
  friends: getFriends(),
})

viewData.done(function(viewData) {
  console.log(25, viewData)
})
// if anyone promise is reject, the result promise will be rejected with
// the same reason of the promise rejected first

// run `node consumer-promise-delay-timeout.js`
