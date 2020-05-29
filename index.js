// Server
const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
// GraphQL configs
const schema = require('./src/graphConfig.js')

// Port config
app.listen(3000, () => {
    console.log('Server running');
    console.log('Open http://localhost:3000/graphql');
    
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
}));
