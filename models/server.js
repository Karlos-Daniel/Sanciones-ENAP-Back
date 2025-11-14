const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {dbConnection} = require('../database/config');
const routesCompania = require('../routes/compania.routes')
const routesRol = require('../routes/rol.routes')
const routesUsuario = require('../routes/usuario.routes')
const routesLogin = require('../routes/login.routes');

class server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        //DB
        this.conectarDB();

        //Middlewares
        this.middlewares();
                
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        
        this.app.use(cors());//cors
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes(){
        
        this.app.use(routesCompania);
        this.app.use(routesRol);
        this.app.use(routesUsuario);
        this.app.use(routesLogin);
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`SERVIDOR CORRIENDO EN http://localhost:${this.port}/`);
        });
    }

}

module.exports=server;