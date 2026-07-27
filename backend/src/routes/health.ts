import { Router } from "express";
import { checkFeeds } from "../services/feedhealth";

const router = Router();

router.get("/", async (_, res) => {

  const results = await checkFeeds();

  const feeds = results.map(result => {

    if (result.status === "fulfilled") {

      return {
        ...result.value,
        status:
          result.value.articles > 0
            ? "online"
            : "empty"
      };

    }

    return {
      status: "failed"
    };

  });

  const working = feeds.filter(f => f.status === "online").length;

  const empty = feeds.filter(f => f.status === "empty").length;

  const failed = feeds.filter(f => f.status === "failed").length;

  res.json({

    total: feeds.length,

    working,

    empty,

    failed,

    successRate:
      `${Math.round((working / feeds.length) * 100)}%`,

    feeds

  });

});

export default router;