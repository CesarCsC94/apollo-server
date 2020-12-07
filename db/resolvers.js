const usuario       = require('../models').usuario;
const producto      = require('../models').producto;
const cliente      = require('../models').cliente;

const bcryptjs      = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;

const crearToken = (payload,key,exp) => {
    const {id, email, nombre, apellido} = payload;
    return jwt.sign({id,email}, key,{expiresIn:exp});
}

//Resolvers
const resolvers = {
    Query: {
        // Usuarios
        obtenerUsuario: async (_,{token},ctx) => {
            const usuarioId = await jwt.verify(token,'KEY_SECRETA');
            return usuarioId;
        },
        
        // Productos
        obtenerProductos: async () => {
            try{
                let productos = await producto.findAll();
                return productos;
            }catch(error){
                return error;
            }
        },
        obtenerProducto: async (_,{id},ctx) => {
            try{
                const productoExistente = await producto.findByPk(id);
                
                if(!productoExistente){
                    throw new Error('No existe el producto');
                }
                
                return productoExistente;
            }catch(error){
                return error;
            }
        },
        
        //Clientes
        obtenerClientes: async () => {
            try{
                let clientes = await cliente.findAll({
                    include:[{
                        model: usuario,
                        as: 'usuario'
                    }]
                });
                
                return clientes;
            }catch(error){
                return error;
            }
        },
        obtenerClientesVendedor: async (_, {}, ctx) => {
            try{
                let clientes = await cliente.findAll({
                    where:{
                        vendedor:ctx.usuario.id
                    },
                    include:[{
                        model: usuario,
                        as: 'usuario'
                    }]
                });
                
                return clientes;
            }catch(error){
                return error;
            }
        },
        obtenerCliente: async (_,{id},ctx) => {
            try{
                let clientes = await cliente.findOne({where:{id,vendedor:ctx.usuario.id}})
                if(!clientes){
                    throw new Error('No existe el registro');
                }
                
                return clientes;
            }catch(error){
                return error;
            }
        }
    },
    Mutation: {
        // Usuarios
        nuevoUsuario: async (_,{input},ctx) => {
            try{
                //Revisar si el usuario ya esta registrado
                const { email,password } = input;
                const existeUsuario = await usuario.findOne({where:{id}});
                
                
                if(existeUsuario){ 
                    throw new Error('El usuario ya existe en la BD');
                }
                
                //Hashear la password
                const salt = bcryptjs.genSaltSync(10);
                input.password = bcryptjs.hashSync(password, salt);
                
                let user = await usuario.create(input);
                return user;
            }catch(error){
                return error;
            }
        },
        autenticarUsuario: async (_,{input},ctx) => {
            try{
                //Si el usuario existe
                const {email,password} = input;

                const existeUsuario = await usuario.findOne({
                    where:{
                        [Op.or]: [{email}]
                    }
                });
                if(!existeUsuario){
                    throw new Error('El usuario NO existe en la BD');
                }
                
                //Revisar si el password es correcto
                let passwordCorrecto = bcryptjs.compareSync(password, existeUsuario.password);
             
                if(!passwordCorrecto){
                    throw new Error('Credenciales incorrectas');
                }
                
                //Crear el token
                let token = crearToken(existeUsuario,'KEY_SECRETA','3h');
                
                return {
                    token
                }
                
            }catch(error){
                return error;
            }
        },
        
        //Productos
        nuevoProducto: async (_,{input},ctx) => {
            try{
                //Guardar producto
                let nuevoProducto = await producto.create(input);
                return nuevoProducto;
            }catch(error){
                return error;
            }
        },
        actualizarProducto: async (_,{id,input},ctx) => {
            try{
                //obtener registro
                const productoExistente = await producto.findByPk(id);
                
                if(!productoExistente){
                    throw new Error('No existe el producto');
                }
                
                const result = await productoExistente.update(input);
                console.log(input);
                return productoExistente; 
            }catch(error){
                return error;
            }
        },
        eliminarProducto: async (_,{id}) => {
            try{
                //obtener registro
                const productoExistente = await producto.findByPk(id);
                
                if(!productoExistente){
                    throw new Error('No existe el producto');
                }
                
                await productoExistente.destroy();
                return "Producto eliminado";
            }catch(error){
                return error;
            }
        },
        
        //Clientes
        nuevoCliente: async (_, {input}, ctx) => {
            try{
                const { email,password } = input;
                let cliente_Existente = await cliente.findOne({
                    where:{ email }
                });
                
                //console.log(ctx.usuario.id);
                input.vendedor = ctx.usuario.id;
                
                if(cliente_Existente){
                    throw new Error('El cliente ya existe en la BD');
                }
                
                let nuevo_cliente = await cliente.create(input);
                return nuevo_cliente;
            }catch(error){
                return error;
            }
        }
    }
}

module.exports = {resolvers};