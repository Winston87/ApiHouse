// metedos utilizados no controller => index, store, show, update, destroy
// index e usado para fazer listagem de sessoes 
// store e usado para criar uma sessao por ex um loguin
// show quano queremos listar uma unica sessao
// update quando queremos alterar uma alguma sessao
// destroy quando queremos deletar uma sessao

import User from "../model/User";
import Valida from '../exception/ExeceptionError';
import Mensagens from '../exception/Menseng';

class SessionController {


     // busca usuario
     async index(req, res) {

        const { email } = req.headers;

        const emialUser = await User.find({ email });

        return res.json( emialUser );
    }
    

    // metedo de fazer post de email
    async store(req, res) {

        const { email } = req.body;

        Valida.validarEmail(req,res);

        let user = await User.findOne({ email }); // verifica sem tem email igual 

        if ( !user ) {
            user = await User.create({ email });
            
        }else{

             Mensagens.MensegensErrorEmail(res);
        }

        return res.json(user);
    }


}


export default new SessionController();