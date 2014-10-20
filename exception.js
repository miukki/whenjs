var when = require('./bower_components/when')
var when_delay = require('./bower_components/when/delay')


// promise.then
when.reject('some error').then(undefined, function() {
  console.log(7, arguments)
})

// the second function cannot catch exception thrown from the first one, onFulfilled
when({name: 'Jack'}).then(function(user) {
  console.log(12, user.getName()) // an exception is thrown here, since `user.getName` is not a function
}, function() {
  console.log(14, arguments) // but the exception cannot be caught here
}).catch(function() {
  console.log(16, arguments)
})

// promise.catch for ES5 env, promise.otherwise for non-ES5 env
when.reject('some error').catch(function() {
  console.log(21, arguments);
})

when({name: 'Jack'}).then(function(user) {
  console.log(25, user.getName())
}).catch(function() {
  console.log(27, arguments)
})

// promise.else for ES5 env, promise.orElse for non-ES5 env
~(function() {
  function getUserName() {
    return when.reject('fail to get user name')
  }

  // in many cases of exception, we want to return a default value as fallback
  function getUserNameOrDefault1() {
    return getUserName().then(function() {
      // do sth.
    }).catch(function() {
      return 'unknown user name'; // default value
    })
  }

  // you can do it in this way
  function getUserNameOrDefault2() {
    return getUserName().then(function() {
      // do sth.
    }).else('unknown user name')
  }

  getUserNameOrDefault1().then(function() {
    console.log(53, arguments)
  })

  getUserNameOrDefault2().then(function() {
    console.log(57, arguments)
  })
})()

// promise.finally for ES5 env, promise.ensure for non-ES5 env
~(function() {
  function getUserName() {
    return when.promise(function(reolve, reject) {
      setTimeout(function() {
        reject('failed to get user name')
      }, 3000)
    })
  }
  // do sth. after getting user name, no matter if it succeeds or not
  getUserName().finally(function() {
    console.log(68, 'we have tried our best to get user name, but failed...')
  })
})()

/*
promise.then(function() {
  // try to do sth.
}).catch(function(e) {
  // handle the exception
}).finally(function() {
  // do sth. else
})

is simlar to

try {
  // try to do sth.
} catch(e) {
  // handle the exception
} finally {
  // do sth. else
}
*/


when_delay(5000).then(function() {
  // we often do this
  function getName(user) {
    // get user name asynchronously
    return when('friend name').delay(1000)
  }
  function getUserFriend1(user) {
    if (user && user.friends && user.friends[0]) {
      return getName(user.friends[0]);
    }
    return when.reject();
  }
  getUserFriend1({friends: null}).then(function() {
    console.log(110, arguments)
  }).catch(function() {
    console.log(112, 'the user has no friend')
  })

  // try to do it in this way
  function getUserFriend2(user) {
    return when().then(function() {
      return getName(user.friends[0])
    })
  }
  getUserFriend2(null).then(function() {
    console.log(122, arguments)
  }).catch(function() {
    console.log(124, 'the user has no friend')
  })

})
