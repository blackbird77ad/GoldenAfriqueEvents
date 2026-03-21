import { Router } from 'express';
import protect from '../Middlewares/auth.mjs';
import {
  getRentalItems, getPublicRentalItems,
  createRentalItem, updateRentalItem,
  deleteRentalItem, toggleRentalItem,
} from '../Controllers/rentalController.mjs';

const router = Router();

router.get('/public',       getPublicRentalItems);
router.get('/',             protect, getRentalItems);
router.post('/',            protect, createRentalItem);
router.put('/:id',          protect, updateRentalItem);
router.delete('/:id',       protect, deleteRentalItem);
router.patch('/:id/toggle', protect, toggleRentalItem);

export default router;
