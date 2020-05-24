const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const students = require('./src/dao/student.json');
const courses = require('./src/dao/course.json');
const grades = require('./src/dao/grade.json');


// Course -> id, name, description
const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represent courses',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
    })
});

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
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
        course: {
            type: CourseType,
            description: 'Particular Course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id === args.id)
        },
        grade: {
            type: GradeType,
            description: 'Particular Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id === args.id)
        }

    }),
});

// POST and PUT requests
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
                    id: course.length + 1,
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
        }
    })
})


const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.listen(3000, () => {
    console.log('Server running');
    console.log('open localhost:3000/graphql');
    
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
}));
