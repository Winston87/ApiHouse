class MensegensError {

    async MensegensErrorEmail(res){

        return res.status(401).json({error: 'Email ja esta em uso'});
    }


    async MensegensErrorNaoAutorizdo(res){

        return res.status(401).json({error: 'Não autorizado.'});
    }
}

export default new MensegensError();
