var when = require('./bower_components/when')


var p1 = when('p1').delay(1000)
var p2 = when('p2').delay(2000)
var v3 = 'value 3'
var p4 = when.reject('error 4')

// promise.yield

/*
  whenever we do this,
    p1.then(function() {
      return p2
    })
  we can do it as below
*/
var p5 = p1.yield(p2)
var p6 = p1.yield(v3)
var p7 = p1.yield(p4)

p5.done(function() {
  console.log(23, arguments)
})
p6.done(function() {
  console.log(26, arguments)
})
p7.catch(function() {
  console.log(29, arguments)
})

// run `node consumer-promise-tap.js`
