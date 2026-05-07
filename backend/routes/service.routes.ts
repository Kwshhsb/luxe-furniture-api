import express from "express";
import { getAllServices } from "../controllers/service.controller";

const router = express.Router();

router.get("/", getAllServices);

export default router;
