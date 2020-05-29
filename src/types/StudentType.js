// data import
const courses = require('../dao/course.json');
// type import
const CourseType = require('./CourseType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

// student -> id, name, last_name, course_id
const StudentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represent students',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        last_name: { type: GraphQLNonNull(GraphQLString) },
        course_id: { type: GraphQLNonNull(GraphQLString) },
        course: {
            type: CourseType,
            resolve: (student) => {
                return courses.find(course => course.id === student.course_id)
            }
        }
    })
});

module.exports = StudentType;