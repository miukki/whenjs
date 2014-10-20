var when = require('./bower_components/when')


var p1 = when('p1').delay(1000)
var p2 = when('p2').delay(2000)
var v3 = 'value 3'
var p4 = when.reject('error 4')
// when.join
when.join(p1, p2, v3).then(function() {
  console.log(10, arguments)
})

when.join(p1, p2, v3, p4).catch(function() {
  console.log(14, arguments)
})

//when.all
when.all([p1, p2, v3]).then(function() {
  console.log(19, arguments)
})

when.all([p1, p2, v3, p4]).catch(function() {
  console.log(23, arguments)
})

// run `node consumer-when-keys.js`
