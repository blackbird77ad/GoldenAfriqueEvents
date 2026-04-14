import { Router } from 'express';
import {
  setupPin,
  loginWithPin,
  resetPin,
  checkStatus,
} from '../Controllers/authController.mjs';

const router = Router();

router.get('/status', checkStatus);
router.post('/setup', setupPin);
router.post('/login', loginWithPin);
router.post('/reset', resetPin);

export default router;