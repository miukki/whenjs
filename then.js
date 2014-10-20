require([
  'when/when',
  'jquery'
], function(
  when,
  $
) {
'use strict'


// load sth. using jQuery
$.get('then.html', function(content) {
  console.log(13, content)
})

// for jQuery 1.5+, you can do it as below
// since jQuery's implementation for promise is not Promise/A+ starndard-complaint, we wrap it with when()
var getThenHtml = when($.get('then.html'))
getThenHtml.then(function(content) {
  console.log(20, content)
})

// you can also write these in different functions or modules, whatever you want
// in a module which role is producer
function getContent(url) {
  return when($.get(url))
}
// in a module which role is comsumer
function outputContent(content) {
  // maybe you do some extra processing first
  console.log(31, content)
}
// in you app module
var resultThen = getContent('then.html').then(outputContent)
console.log(35, when.isPromiseLike(resultThen), resultThen)

// then() return a new promise that you can return from a function
// if you don't want to create new promise, use done() instead
var resultDone = getContent('then.html').done(outputContent)
console.log(40, when.isPromiseLike(resultDone), resultDone)


// 2 secnods after the promise is fulfilled
// think about the output
resultThen.delay(2000).then(function() {
  console.log(46, 'before calling then')
  resultThen.done(function() {
    console.log(48, 'maybe you think this should appear before output of line 50 because the promise has been fulfilled long before')
  })
  console.log(50, 'after calling then')
})

})
