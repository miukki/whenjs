var when = require('./bower_components/when')
var when_delay = require('./bower_components/when/delay')


var p1 = when('p1') // a promise fulfilled yet, `when(someValue)` is the easiest way to create a fulfilled promise
var p2 = when.resolve('p2') // similar to the one above
var p3 = when_delay(1000).yield('p3') // a pending promise to be fulfilled at least 1 second later
var p4 = when.reject('error p4') // a promise rejected yet
var p5 = when_delay(1000).yield(when.reject('error p5')) // a pending promise to be rejected at least 1 second later

console.log(11, 'p1', p1.inspect())
console.log(12, 'p2', p2.inspect())
console.log(13, 'p3', p3.inspect())
console.log(14, 'p4', p4.inspect())
console.log(15, 'p5', p5.inspect())


console.log(18, '2 seconds later:')
when_delay(2000).then(function() {
  console.log(20, 'p3', p3.inspect()) // just for debug, never grab the result of promise by `promise.inspect().value`
  console.log(21, 'p5', p5.inspect())
})

// now, run `node state-chang.js`
