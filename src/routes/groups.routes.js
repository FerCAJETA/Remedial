import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup
} from '../controllers/group.controller.js';

const router = Router();

router.get('/', authRequired, getAllGroups);
router.post('/', authRequired, createGroup);
router.put('/:id', authRequired, updateGroup);
router.delete('/:id', authRequired, deleteGroup);

export default router; 