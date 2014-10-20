var when = require('./bower_components/when')
var when_delay = require('./bower_components/when/delay')
var _ = require('./bower_components/lodash/dist/lodash')


// assume these are service API provided by some module we can't control
var courses = [{
    id: 1,
    name: 'A0',
    description: 'ABC course'
  }, {
    id: 1,
    name: 'A1',
    description: 'Advanced course'
  }]

var students = [{
    id: 1,
    name: 'Student A',
    gender: 'M',
    level: 1,
    courses: ['A0']
  }, {
    id: 2,
    name: 'Student B',
    gender: 'F',
    level: 2,
    courses: ['A0', 'A1']
  }]

var teachers = [{
    id: 1,
    name: 'Teacher A',
    course: 'A0'
  }, {
    id: 2,
    name: 'Teacher B',
    course: 'A1'
  }]

function getCourses(courseNames) {
  console.log('42, getCourses:', courseNames)
  return when(_.filter(courses, function(course) {
    return _.contains(courseNames, course.name)
  })).delay(1000)
}

function getTeachers(courseNames) {
  console.log('49, getTeachers:', courseNames)
  return when(_.filter(teachers, function(teacher) {
    return _.contains(courseNames, teacher.course)
  })).delay(1000)
}

function getStudentById(studentId) {
  console.log('56, getStudentById:', studentId)
  return when(_.find(students, {id: studentId})).delay(1000)
}

// we want to get a student's teachers
function getTeachersByStudentId(studentId) {
  return getStudentById(studentId)
    .then(function(student) {
      return getCourses(student.courses)
    }).then(function(courses) {
      return getTeachers(_.pluck(courses, 'name'))
    })
}

// student A
console.log('--------- get teacher for student A ----------')
var p1 = getTeachersByStudentId(1)
p1.done(function(teachers) {
  console.log(74, teachers)
}, function(error) {
  console.log(76, error)
})

// student B
var p2 = p1.delay(2000).then(function() {
  console.log('--------- get teacher for student B ----------')
  return getTeachersByStudentId(2);
})
p2.done(function(teachers) {
  console.log(85, teachers)
}, function(error) {
  console.log(87, error)
})

// avoid this style, even though you maybe solve your problem!
// they are nested, not chained
p2.delay(2000).then(function() {
  console.log('---------- get teacher for student A, in bad style ----------')
  getStudentById(1).then(function(student) {
    getCourses(student.courses).then(function(courses) {
      getTeachers(_.pluck(courses, 'name')).then(function(teachers) {
        console.log(97, teachers)
      })
    })
  })
})