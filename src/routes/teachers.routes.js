import { Router } from 'express';
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, getAllTeachers);
router.post('/', authRequired, createTeacher);
router.put('/:id', authRequired, updateTeacher);
router.delete('/:id', authRequired, deleteTeacher);

export default router;
