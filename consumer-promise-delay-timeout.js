var when = require('./bower_components/when')


// promise.delay
var p1 = when.promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('some value')
  }, Math.random() * 2000)
})
// this will be fulfilled 2 second after p1 is fulfilled
var p2 = p1.delay(2000).then(function() {
  console.log(12, arguments)
})

p2.delay(1000).done(function() {
  var p3 = when.promise(function(resolve, reject) {
    setTimeout(function() {
      console.log(18, 'p3 is rejected now')
      reject('some error')
    }, Math.random() * 2000)
  })
  // but this will be rejected quickly
  var p4 = p3.delay(2000)
  p4.catch(function() {
    console.log(25, arguments)
  })
})


// promise.timeout
p2.delay(5000).done(function() {
  var p5 = when.promise(function(resolve, reject) {
    setTimeout(function() {
      console.log(34, 'p5 is fulfilled')
      resolve('some value')
    }, 500)
  })
  // this will be fulfilled since the original promise will be fulfilled after 0.5 second, less than 1 second
  var p6 = p5.timeout(1000)
  p6.done(function() {
    console.log(41, 'p6 is fulfilled', arguments)
  })

  // but this will be rejected after 1 second
  when('you cannot see this').delay(2000).timeout(1000, 'we cannot wait any longer').catch(function() {
    console.log(46, arguments)
  })
  // imagine that you want load sth. by XHR, and do some staff when it is loaded successfully,
  // but you cannot always let the user wait a long time, so you need set a timeout to limit
  // the maximum time the loading can be waited, otherwise treat it same as exception
})

