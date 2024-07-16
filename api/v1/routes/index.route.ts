import { tasksRoute } from "./tasks.route";

const routeApiV1 = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", tasksRoute);
}

export default routeApiV1;