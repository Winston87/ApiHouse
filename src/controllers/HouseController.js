import House from '../model/House';
import User from '../model/User';
import Validar from '../exception/ExeceptionError'
import Mensagens from '../exception/Menseng';

class HouseController {


    // busca uma casa com params status true ou false
    async index(req, res) {

        const { status } = req.query;

        const houses = await House.find({ status });

        return res.json( houses );
    }

    //postar uma casa metedo post
    async store(req, res) {

        const { filename } = req.file;
        const { descripton, price, location, status } = req.body;
        const { user_id } = req.headers;

        Validar.validarCampos(req, res).schema;
        
        const house = await  House.create({

            user: user_id,
            thumbnail:  filename,
            descripton,
            price,
            location,
            status,
        });
       
        return res.json({house});

    }

    // atualizar uma casa ...
    async updade(req, res) {

        const { filename } = req.file;
        const { house_id } = req.params;
        const { user_id  } = req.headers;
        const { descripton, price, location, status } = req.body;

        const  user  =  await User.findById(user_id);
        const  houser = await House.findById(house_id);

        if (String(user_id) !== String(house_id)){

            Mensagens.MensegensErrorNaoAutorizdo(res);
        }

        Validar.validarCampos(req, res).schema;

        const house = await House.updateOne({_id: house_id},{

            user: user_id,
            thumbnail:  filename,
            descripton,
            price,
            location,
            status,

        });

        return res.send();
    }

    // deletar uma casa 
    async destroy(req, res) {

        const { house_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const housess = await House.findById(house_id);

        if (String(user._id) !== String(housess.user)){

            Mensagens.MensegensErrorNaoAutorizdo(res);

        }

        await House.findByIdAndDelete({_id: house_id});

        return res.json({messeg: 'deletado'});
    }

}


export default new HouseController();
