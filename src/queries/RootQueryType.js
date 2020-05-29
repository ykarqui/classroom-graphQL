// data imports
const courses = require('../dao/course.json');
const students = require('../dao/student.json');
const grades = require('../dao/grade.json');

// type imports
const CourseType = require('../types/CourseType');
const StudentType = require('../types/StudentType');
const GradeType = require('../types/GradeType');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

// Gets
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of All Students',
            resolve: () => students
        },
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of All Courses',
            resolve: () => courses
        },
        grades: {
            type: new GraphQLList(GradeType),
            description: 'List of All Grades',
            resolve: () => grades
        },
        student: {
            type: StudentType,
            description: 'Particular Student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id == args.id)
        },
        course: {
            type: CourseType,
            description: 'Particular Course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id == args.id)
        },
        grade: {
            type: GradeType,
            description: 'Particular Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id == args.id)
        }

    }),
});

module.exports = RootQueryType;