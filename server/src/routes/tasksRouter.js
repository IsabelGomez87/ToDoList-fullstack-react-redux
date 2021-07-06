const { Router } = require('express');
const tasksController = require('../controllers/tasksController')();

function tasksRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(tasksController.getAll)
    .post(tasksController.createOne);

  routes
    .route('/:taskId')
    .get(tasksController.getById)
    .put(tasksController.updateById)
    .delete(tasksController.deleteById);

  return routes;
}

module.exports = tasksRouter();
