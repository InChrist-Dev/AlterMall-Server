import express from 'express';
import { renderDefault, getItems, getItemsPage } from "../controllers/page.js";

const router = express.Router();

router.get('/', renderDefault);
router.get('items/', getItems);
router.get('/items/:id', getItems);
// router.get('/items?:p', getItems);

export const pageRouter = router;