import express from 'express';
import { renderDefault, renderProfile } from "../controllers/page.js";

const router = express.Router();

router.get('/', renderDefault);

router.get('/profile/', renderProfile)
router.get('/profile/:name', renderProfile);

export const pageRouter = router;