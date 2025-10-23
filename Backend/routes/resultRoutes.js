import express from 'express';
import checkResult from '../controllers/resultController.js';

const routes=express.Router();
routes.post("/results",checkResult);

export default routes;