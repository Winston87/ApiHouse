import express from 'express';
import path from 'path'
import mongoose from 'mongoose';
import cors from 'cors';
import  routes from './route';

class App {

    constructor () {

        this.server = express();

        mongoose.connect('mongodb+srv://DevHouse:dev@devhouse.zkmov.mongodb.net/devhouse?retryWrites=true&w=majority', { // configuracao do banco de dados 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.middlewares();
        this.routes();

    }

    middlewares () {

        this.server.use(cors());

        this.server.use(// caminho para abrir imagem na pagina web 
            '/file',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json());

    }

    routes () {

        this.server.use(routes);
        
    }

}
export default new App().server;

