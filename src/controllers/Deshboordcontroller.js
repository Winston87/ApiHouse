import House from '../model/House';

class DeshboordController {


    async show(req, res) {

        const { user_id } =  req.headers;

        const house = await House.find({user: user_id});

        return res.json(house);
    }
}


export default new DeshboordController();