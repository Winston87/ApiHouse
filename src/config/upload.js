import multer from 'multer';  //biblioteca para trabalhar com multformdatas trabalhar com  imagens
import path from 'path';

export default {  // configuraçaõ de armazena imagens

    storage: multer.diskStorage({ //multer.diskStorage esta dizendo que vai armazenar minhas imagens no local indicado 

        destination: path.resolve(__dirname, '..', '..', 'uploads'), // caminho da pasta , __dirname localiza a raiz do nosso projetto
        filename: (req, file, cb) => {                               // funcao envia foto

            const ext = path.extname(file.originalname);         //faz uma extensao da imagem e armazena no ext
            const name = path.basename(file.originalname, ext);  //pega o nome do arquivo e passaa a extensao

            cb(null, `${name}-${Date.now()}${ext}`)             //manipula nome da imagem 
        },
    })   /// ${name}-${Date.now()} pegs  nome da imagem e a data e tempo para evitar repetir 
};