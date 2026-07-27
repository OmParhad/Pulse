import { Router } from "express";
import { feeds } from "../feeds";

const router = Router();

router.get("/", (_, res) => {

    const categories = [
        ...new Set(
            feeds
                .filter((feed: any) => feed.enabled)
                .map((feed: any) => feed.category)
        )
    ];

    res.json({
        total: categories.length,
        categories
    });

});

export default router;