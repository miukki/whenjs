var when = require('./bower_components/when')


// producer is any code by which you can get a promise that you want to use

// these are some promises which results are determined
var p1 = when('p1') // when(someValue) is shortcut of when.resolve(someValue)
var p2 = when.resolve('p2')
var p3 = when.reject('error 3')

// these are some promises which results can be determined easily
var p4 = when.promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('p4 is a promise fulfilled finally')
  }, 500)
})
var p5 = when.promise(function(resolve, reject) {
  setTimeout(function() {
    reject('p5 is a promise rejected finally')
  }, 1000)
})

p4.then(function() {
  console.log(24, arguments)
})
p5.catch(function() {
  console.log(27, arguments)
})

// run `node producer-manually.js`
