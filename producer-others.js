var when_poll = require('./bower_components/when/poll')


// working with 3rd party non-promise based module

var env;
setTimeout(function() {
  env = {}
}, 1000)
setTimeout(function() {
  env.isReady = true;
}, 2000)

// we check `env.isReady` periodically
var p1 = when_poll(function() {}, 100, function() {
  return env && env.isReady
}).yield('p1: env is ready')
p1.then(function() {
  console.log(19, arguments)
})