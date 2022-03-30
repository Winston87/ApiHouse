
import House from '../model/House';
import User from '../model/User'
import * as Yup from 'yup'; // validar 


class Execeptions {


    async validarCampos(req,res) { // validar campos em branco

        const schema = Yup.object().shape({ // validar campos se estao em branco

            descripton: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),

        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Preencha todos os campos '});
        }

       
    }

    async validarEmail(req,res) {

        const schema = Yup.object().shape({

            email: Yup.string().email().required(),
        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Email não é valido '});
        }


    }

    


    }



export default new Execeptions();