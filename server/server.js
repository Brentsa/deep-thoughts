const express = require('express');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

//import Apollo server
const {ApolloServer} = require('apollo-server-express');

//import typeDefs and resolvers
const {typeDefs, resolvers} = require('./schemas');

//create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: authMiddleware  
});

//integrate our Apollo server with Express application as middleware 
server.applyMiddleware({app});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve up static assets from client side build folder if node environment is in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//wildcard get route, respond with react front end code if a server route used is not defined
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    
    //log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
