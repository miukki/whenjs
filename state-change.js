var when = require('./bower_components/when')


var d1 = when.defer();
var p1 = d1.promise;
console.log(1, 'p1', p1.inspect())
d1.resolve('p1')
console.log(8, 'p1', p1.inspect())
d1.reject('error p1')
console.log(10, 'p1', p1.inspect())

var d2 = when.defer()
var p2 = d2.promise
console.log(14, 'p2', p2.inspect())
d2.reject('error p2')
console.log(16, 'p2', p2.inspect())
d2.resolve('p2')
console.log(18, 'p2', p2.inspect())
