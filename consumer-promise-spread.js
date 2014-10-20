var when = require('./bower_components/when')


var user = ['jack', 'M']
function introduceOneUser(name, gender) {
  return name + ' is a ' + (gender.toLowerCase() === 'm' ? 'boy' : 'girl')
}
// promise.spread
// if a promise is fulfilled with an array, you can use `spread()`
// and name each element you want, avoiding accessing them by array index
var p1 = when(user).delay(1000).spread(function(name, gender) {
  return introduceOneUser(name, gender)
})
// however, you can do it in this way if you like it
var p2 = when(user).delay(2000).then(function(results) {
  var name = results[0]
  var gender = results[1]
  return introduceOneUser(name, gender)
})
p1.then(function() {
  console.log(21, 'spread', arguments)
})
p2.then(function() {
  console.log(24, ' then ', arguments)
})


// run `node consumer-when-join-all.js`
