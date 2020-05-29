// data imports
const courses = require('../dao/course.json');
const students = require('../dao/student.json');

// type imports
const CourseType = require('./CourseType');
const StudentType = require('./StudentType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

// grade -> id, course_id, student_id, grade
const GradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represent grades',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        course_id: { type: GraphQLNonNull(GraphQLString) },
        course: {
            type: CourseType,
            resolve: (grade) => {
                return courses.find(course => course.id === grade.course_id)
            }
        },
        student_id: { type: GraphQLNonNull(GraphQLString) },
        student: {
            type: StudentType,
            resolve: (grade) => {
                return students.find(student => student.id === grade.student_id)
            }
        },
        grade: { type: GraphQLNonNull(GraphQLInt) },
    })
});

module.exports = GradeType;