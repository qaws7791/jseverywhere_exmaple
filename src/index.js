require('dotenv').config();
const db = require('./db');
const models = require('./models');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { argsToArgsConfig } = require('graphql/type/definition');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const app = express();
app.use(helmet());
app.use(cors());


const getUser = token => {
    if(token){
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error('Session invalid');
        }
    }
};


let notes = [
    {id: '1', content: 'This is a note', author: 'Adam Scott'},
    {id: '2', content: 'This is another note', author: 'Harlow Everly'},
    {id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison'}
];

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        //load token from header
        const token = req.headers.authorization;
        //get user
        const user = getUser(token);

        console.log(user);
        //add models and user to context
        return { models, user };
    }
});

db.connet(DB_HOST);

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req,res) => res.send("Hello World!!!"));

app.listen({port}, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));


// index.js
// This is the main entry point of our application
