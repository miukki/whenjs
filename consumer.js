var when = require('./bower_components/when')
var when_delay = require('./bower_components/when/delay')


// consumer is any code depending on promise it gets
var p1 = when('p1').delay(1000)
var p2 = when('p2').delay(2000)
var v3 = 'value 3'
var p4 = when.reject('error 4')

// `promise.then` returns a new promise
// since `p2` is a promise, the result promise `p5` will be
// 1: fulfilled if `p1` and `p2` are both fulfilled, its value is from `p2`
// 2: fulfilled if either `p1` or `p2` is rejected
var p5 = p1.then(function() {
  return p2
})
// `p6` will be rejected
var p6 = p4.then(function() {
  return p2
})
// `p7` will be fulfilled with `value 3`
var p7 = p1.then(function() {
  return v3
})

p5.then(function() {
  console.log(28, arguments)
})
p6.catch(function() {
  console.log(31, arguments)
})
p7.then(function() {
  console.log(34, arguments)
})

// there're some shortcuts of `then`

// run `node consumer-promise-yield.js`
