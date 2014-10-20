var when = require('./bower_components/when')


var p1 = when('p1').delay(1000)
// promise.tap
// whenever you do this
function doSideEffects() {
  console.log(8, 'do side effects', arguments)
}
var p2 = p1.then(function(value) {
  doSideEffects(value)
  return value
})

p2.done(function() {
  console.log(16, arguments)
})

// run `node consumer-promise-spread.js`
