import Reserva  from '../model/Reserva';
import  User from '../model/User';
import Houser from '../model/House';


class ReservaController {



    async index(req, res) {

        const { user_id } =  req.headers;

        const reservas = await Reserva.find({user: user_id}).populate('house');

        return res.json(reservas);
    }

    async store(req, res) {

        const { user_id }  = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await Houser.findById(house_id);
        if(!house) {        // validar id casa se existe 

            return res.status(400).json({error: 'Essa casa nao existe'});
        }

        if(house.status !== true) { 

            return res.status(400).json({error: 'Indisponivel'});

        }

        const user = await User.findById(user_id);

        if(String(user._id) === String(house.user)) { // um user dono da casa nao pode alugar a sua propria casa 

            return res.status(401).json({error: 'nao permitida'});

        }


        const reserva = await Reserva.create({

            user: user_id,
            house: house_id,
            date,
        });



        // await reserva.populate('house').populate('user').execPopulate();

        return res.json(reserva);
    }


    async destroy(req, res) {

        const { reserva_id } =  req.body;

        await Reserva.findByIdAndDelete({_id: reserva_id});

        return res.status(204).send();
    }
}




export default new ReservaController();