const { gql } = require('apollo-server');

const typeDefs = gql`
    type Usuario {
        id:ID
        nombre:String
        apellido:String
        email:String
        created_at:String
        updated_at:String
    }    
    
    type Token {
        token:String
    }

    type Producto {
        id:ID
        nombre:String
        existencia:Int
        precio:Float
        created_at:String
        updated_at:String
    } 
    
    type Cliente {
        id:ID
        nombre:String
        apellido:String
        empresa:String
        email:String
        telefono:String
        vendedor:ID
        usuario:Usuario
        created_at:String
        updated_at:String
    }
    
    input ProductoInput {
        nombre:String!
        existencia:Int!
        precio:Float!
    }

    input UsuarioInput {
        nombre:String!
        apellido:String
        email:String!
        password:String!
    }

    input ClienteInput {
        nombre:String!
        apellido:String!
        empresa:String!
        email:String!
        telefono:String
    }
    
    input AutenticarInput{
        email:String!
        password:String!
    }

    type Mutation {
        # Usuarios
        nuevoUsuario(input:UsuarioInput!) : Usuario
        autenticarUsuario(input:AutenticarInput!):Token

        # Productos
        nuevoProducto(input:ProductoInput!) : Producto
        actualizarProducto(id:ID,input:ProductoInput!) : Producto
        eliminarProducto(id:ID) : String

        # Clientes 
        nuevoCliente(input:ClienteInput!) : Cliente
    }

    type Query {
        # Usuarios
        obtenerUsuario(token:String!):Usuario
        
        # Productos
        obtenerProductos : [Producto]
        obtenerProducto(id:ID!) : Producto

        # Clientes
        obtenerClientes : [Cliente]
        obtenerClientesVendedor : [Cliente]
        obtenerCliente(id:ID!) : Cliente
    }
`;

module.exports = typeDefs;