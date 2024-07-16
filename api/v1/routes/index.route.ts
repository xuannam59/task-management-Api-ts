import { tasksRoute } from "./tasks.route";
import { userRouter } from "./user.route";

const routeApiV1 = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", tasksRoute);

  app.use(version + "/user", userRouter);
}

export default routeApiV1;