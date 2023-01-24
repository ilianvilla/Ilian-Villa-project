import express from 'express';
const router = express.Router();
import controllers from '../controllers/room';


router.get('/rooms', controllers.show)
router.get('/room/:id/edit', controllers.edit)
router.post('/room/update', controllers.update)
router.get('/room/:id/delete', controllers.delete)


export default router;