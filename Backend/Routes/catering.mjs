import { Router } from 'express';
import protect from '../Middlewares/auth.mjs';
import {
  getCateringItems, getPublicCateringItems,
  createCateringItem, updateCateringItem,
  deleteCateringItem, toggleCateringItem,
} from '../Controllers/cateringController.mjs';

const router = Router();

router.get('/public',       getPublicCateringItems);       // public — no auth
router.get('/',             protect, getCateringItems);    // admin — all items
router.post('/',            protect, createCateringItem);
router.put('/:id',          protect, updateCateringItem);
router.delete('/:id',       protect, deleteCateringItem);
router.patch('/:id/toggle', protect, toggleCateringItem);

export default router;
