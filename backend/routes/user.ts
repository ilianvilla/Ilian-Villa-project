import express from 'express';
const router = express.Router();
import controllers from '../controllers/user';


router.get('/users', controllers.show)
router.get('/user/:id/edit', controllers.edit)
router.post('/user/update', controllers.update)
router.get('/user/:id/delete', controllers.delete)


export default router;