import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/student.controller.js';

const router = Router();

router.get('/', authRequired, getAllStudents);
router.post('/', authRequired, createStudent);
router.put('/:id', authRequired, updateStudent);
router.delete('/:id', authRequired, deleteStudent);

export default router; 