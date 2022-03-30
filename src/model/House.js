import { Schema, model }  from 'mongoose';

const HouseSchema = new Schema({

    thumbnail: String,
    descripton: String,
    price: Number,
    location: String,
    status: Boolean,

    user:{// buscando id do user
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    toJSON: { //  para colocar a variavel virutual junto com a requisição
        virtuals: true
    }
});


// HouseSchema.virtual e para criar um virtual quando cria um casa nao criar a imagem no banco mais se fazer uma busca ele vai estar la 
HouseSchema.virtual('thumbnail_url').get(function(){

    return `http://localhost:3333/file/${this.thumbnail}`; // url para acessar a imagem 
})

export default model('House', HouseSchema);