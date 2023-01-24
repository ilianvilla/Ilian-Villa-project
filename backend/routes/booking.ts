import express from 'express';
const router = express.Router();
import controllers from '../controllers/booking';



router.get('/booking/:id/delete', controllers.delete)


export default router;