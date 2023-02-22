import express from 'express';
const router = express.Router();
import controllers from '../controllers/user';

router.get('/users', controllers.show)
router.get('/user/:id/edit', controllers.edit)
router.put('/user/:id/update', controllers.update)
router.get('/user/delete', controllers.delete)


export default router;