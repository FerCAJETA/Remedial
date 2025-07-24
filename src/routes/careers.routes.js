import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { 
  createCareer,
  getCareers,
  getCareer,
  updateCareer,
  deleteCareer
} from '../controllers/career.controller.js';

const router = Router();

router.get('/careers', authRequired, getCareers); 
router.get('/careers/:id', authRequired, getCareer); 
router.post('/careers', authRequired, createCareer); 
router.put('/careers/:id', authRequired, updateCareer); 
router.delete('/careers/:id', authRequired, deleteCareer); 

export default router;