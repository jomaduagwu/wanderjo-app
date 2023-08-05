const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
 

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// apply Apollo Server middleware to the Express app
// server.applyMiddleware({ app }); 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  

db.once('open', () => {
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
});

  };
  
  
// Call the async function to start the server
  startApolloServer();
