import {
  addTask,
  updateTask,
  moveTaskToList,
  deleteCompletedTasks,
  deleteTask,
} from "../controllers/taskControllers.js";

const taskRoutes = (app) => {
  app.route("/lists/:listId/tasks").post(addTask);
  app.route("/lists/:listId/tasks/:taskId").patch(updateTask);
  app.route("/lists/:listId/tasks/:taskId/move").patch(moveTaskToList);
  app.route("/lists/:listId/tasks/completed").delete(deleteCompletedTasks);
  app.route("/lists/:listId/tasks/:taskId").delete(deleteTask);
};

export default taskRoutes;
