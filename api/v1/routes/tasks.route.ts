import { Router } from "express";

import * as controller from "../controller/tasks.controller";

const router: Router = Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

export const tasksRoute: Router = router;