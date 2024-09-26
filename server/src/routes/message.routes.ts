import express from 'express';
import { sendContactMsg } from '../controllers/contact.controller';

const router = express.Router();

router.post('/contact', sendContactMsg)


export default router