require([
  'when/when',
  'jquery'
], function(
  when,
  $
) {
'use strict'

// we can't determine when user clicks the button
// but we can make a promise first, then fulfill it when the button is clicked
var module1 = {
  ifButtonIsClicked: when.promise(function(resolve, reject) {
    $('button').one('click', function() {
      resolve()
    })
  })
}

// for some reason, we can't add event listener to the button directly
// or maybe this module will be loaded after button is clicked,
// but we want to do sth. if button has been clicked
var module2 = {
  doSth: function(ifButtonIsClicked) {
    ifButtonIsClicked.then(function() {
      console.log(26, 'you click the button')
    })
  }
}
module2.doSth(module1.ifButtonIsClicked)

// start loading content if the button has been clicked
// we can not determine when the loading is finished
var module3 = {
  startLoading: function(ifButtonIsClicked) {
    return ifButtonIsClicked.then(function() {
      console.log(37, 'start loading')
      return when($.get('async.html'))
    })
  }
}

// we want to output the content when it is loaded successfully
var module4 = {
  outputContent: function(content) {
    console.log(46, 'finish loading, here is the content: ', content)
  }
}
module3.startLoading(module1.ifButtonIsClicked).then(module4.outputContent)

})