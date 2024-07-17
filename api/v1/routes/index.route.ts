import { tasksRoute } from "./tasks.route";
import { userRouter } from "./user.route";

import * as autheUserMiddleware from "../middleware/auth-user.middleware";

const routeApiV1 = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", autheUserMiddleware.requestAuth, tasksRoute);

  app.use(version + "/user", userRouter);
}

export default routeApiV1;