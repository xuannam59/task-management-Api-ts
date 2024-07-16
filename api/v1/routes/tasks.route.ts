import { Router } from "express";

import * as controller from "../controller/tasks.controller";

const router: Router = Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const tasksRoute: Router = router;