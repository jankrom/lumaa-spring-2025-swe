import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks';
import { auth } from '../middleware/auth';

const router = Router();

// All routes are protected
router.use(auth);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router; 