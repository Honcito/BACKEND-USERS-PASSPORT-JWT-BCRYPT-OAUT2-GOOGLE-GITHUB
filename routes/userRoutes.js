import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    createMultipleUsers, 
    getUserById, 
    updateUser, 
    deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/multiple-users', createMultipleUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;