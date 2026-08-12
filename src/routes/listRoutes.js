import {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList,
} from "../controllers/listControllers.js";

const listRoutes = (app) => {
  app.route("/lists").get(getLists).post(createList);
  app.route("/lists/:listId").get(getListById).delete(deleteList);
  app.route("/lists/:listId").patch(updateList);
};

export default listRoutes;
