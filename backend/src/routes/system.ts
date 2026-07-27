import { Router } from "express";
import { getArticles } from "../services/feedmanager";

const router = Router();

router.get("/", (_, res) => {

    res.json({

        uptime: process.uptime(),

        memory: process.memoryUsage(),

        articles: getArticles().length,

        timestamp: new Date()

    });

});

export default router;