const {ApolloServer,gql} = require('apollo-server');
const typeDefs = require('./db/schema'); 
const { resolvers } = require('./db/resolvers');
const jwt = require('jsonwebtoken');

//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        //console.log(req.headers(['Authorization']));
        try{
            const token = req.headers["authorization"] || '';
            if(token){
                const usuario = await jwt.verify(token,'KEY_SECRETA');
                return {usuario};
            }
        }catch(error){
            return error;   
        }
    }
});

//Arrancar el servidor
server.listen().then(({url}) => {
  console.log('Servidor listo en la URL '+url)
});