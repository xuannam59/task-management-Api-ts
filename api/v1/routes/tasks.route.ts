import { Router } from "express";

import * as controller from "../controller/tasks.controller";

const router: Router = Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multip", controller.changeMultip);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.deleteOne);

router.patch("/undo/:id", controller.undo);

export const tasksRoute: Router = router;