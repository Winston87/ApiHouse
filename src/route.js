import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import Deshboordcontroller  from './controllers/Deshboordcontroller';
import ReservaController from './controllers/ReservaController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/session',SessionController.index);


//requisição post chamndo uma sessao para salvar n banco
routes.post('/session', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store); // salva 1 foto  para salvar mais usar array no lugar do single

routes.get('/houses',HouseController.index);

routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.updade);

routes.delete('/houses', HouseController.destroy);

routes.get('/deshboord', Deshboordcontroller.show);


routes.post('/houses/:house_id/reserva', ReservaController.store);

routes.get('/reserva', ReservaController.index);

routes.delete('/reserva/cancelar', ReservaController.destroy);


export default routes;

