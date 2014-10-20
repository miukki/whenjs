var when = require('./bower_components/when')


// sometimes you can't determine the result of a promise in a single function body
// you can create promise manually, and determine its result in somewhere else
var d1 = when.defer()
var p1 = d1.promise // we get a promise here

// in other function or module you pass the reference of `d1` in,
// you can determine the result of the promise
// here we fulfill `p1` with some value
// if you call `d1.reject('some error occures'), p1 will be rejected
setTimeout(function() {
  d1.resolve('p1 is fulfilled manually')
}, 1500)
p1.then(function() {
  console.log(17, arguments)
})

// creating promise manually by `when.defer` should be avoided as possible as we can
// in most cases, you create promise based on existing ones while consuming them
// visit https://github.com/cujojs/when/wiki/Anti-patterns

// run `node producer-others.js`