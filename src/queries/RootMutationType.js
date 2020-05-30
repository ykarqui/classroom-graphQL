// data imports
const courses = require('../dao/course.json');
const students = require('../dao/student.json');
const grades = require('../dao/grade.json');

// type imports
const CourseType = require('../types/CourseType');
const StudentType = require('../types/StudentType');
const GradeType = require('../types/GradeType');

// lodash to manage arrays
let _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');


// POST and Delete requests
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addCourse: {
            type: CourseType,
            description: 'Add a course',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const course = {
                    id: courses.length + 1,
                    name: args.name,
                    description: args.description
                }
                courses.push(course)
                return course
            }
        },
        addStudent: {
            type: StudentType,
            description: 'Add a student',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                last_name: { type: GraphQLNonNull(GraphQLString) },
                course_id: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve: (parent, args) => {
                const student = {
                    id: students.length + 1,
                    name: args.name,
                    last_name: args.last_name,
                    course_id: args.course_id
                }
                students.push(student)
                return student
            }
        },
        addGrade: {
            type: GradeType,
            description: 'Add a grade',
            args: {
                grade: { type: GraphQLNonNull(GraphQLString) },
                student_id: { type: GraphQLNonNull(GraphQLString) },
                course_id: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const student = {
                    id: students.length + 1,
                    grade: args.grade,
                    course_id: args.course_id,
                    student_id: args.student_id,
                }
                students.push(student)
                return student
            }
        },
        // No puedo hacer el delete dentro de la mutacion 
        // usando lodash [ _.remove ]
        // "message": "Cannot return null for non-nullable field
        deleteStudent: {
            type: StudentType,
            description: 'Delete a student',
            args: {
                id: { type:(GraphQLInt) }
            },
            resolve: (parent, args) => {
                let currentStudents =_.remove(students, (student) => {
                    return student.id == args.id;
                });
                return currentStudents;
            }
        } ,
        // "message": "Cannot return null for non-nullable field
        deleteCourse: {
            type: CourseType,
            description: 'Delete a Course',
            args: {
                id: { type:(GraphQLInt) }
            },
            resolve: (parent, args) => {
                let currentCourses = _.remove(courses, (course) => {
                    return course.id == args.id;
                });
                return currentCourses;
            }
        } ,
        // "message": "Cannot return null for non-nullable field
        deleteGrade: {
            type: GradeType,
            description: 'Delete a grade',
            args: {
                id: { type:(GraphQLInt) }
            },
            resolve: (parent, args) => {
                let currentGrades = _.remove(grades, (grade) => {
                    return grade.id == args.id;
                });
                return currentGrades;
            }
        } 


    })
})

module.exports = RootMutationType;