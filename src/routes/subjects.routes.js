import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject
} from '../controllers/subject.controller.js';

const router = Router();

router.get('/', authRequired, getAllSubjects);
router.post('/', authRequired, createSubject);
router.put('/:id', authRequired, updateSubject);
router.delete('/:id', authRequired, deleteSubject);

export default router; 