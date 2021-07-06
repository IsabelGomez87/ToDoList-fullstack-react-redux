/* eslint-disable class-methods-use-this */
const {
  getAll, createOne, getById, updateById, deleteById
} = require('./tasksController')();
const Task = require('../model/taskModel');

jest.mock('../model/taskModel');

describe('Given a taskController', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
    send: jest.fn()
  };

  describe('When call to getAll function', () => {
    test('should get all tasks', async () => {
      Task.find.mockResolvedValue([{ name: 'comprar leche', completed: false }]);

      await getAll(null, res);

      expect(res.json).toHaveBeenCalledWith([{ name: 'comprar leche', completed: false }]);
    });
  });

  describe('When call to createOne function', () => {
    test('should create one task', async () => {
      const req = {
        body: { name: 'comprar chocolate', completed: false }
      };
      class TaskMock {
        constructor(task) {
          this.name = task.name;
          this.completed = task.completed;
        }

        save() {}
      }
      const newTask = new TaskMock(req.body);

      Task.mockReturnValue(newTask);

      await createOne(req, res);

      expect(res.json).toHaveBeenCalledWith(newTask);
    });
    test('shoul get an error', async () => {
      const req = {
        body: { name: 'comprar chocolate', completed: false }
      };

      Task.mockReturnValue({ save: jest.fn().mockRejectedValueOnce('error') });

      await createOne(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call getById function', () => {
    const req = {
      params: {
        taskId: 1
      }
    };
    test('should get a task by id', async () => {
      Task.findById.mockResolvedValue([{ id: 1, name: 'comprar chocolate', completed: false }]);

      await getById(req, res);

      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'comprar chocolate', completed: false }]);
    });
    test('should get an error', async () => {
      Task.findById.mockRejectedValue('error');

      await getById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call updateById function', () => {
    const req = {
      params: {
        taskId: 1
      },
      body: {
        name: 'comprar naranjas', completed: false
      },
      new: true
    };

    test('should update one task by id', async () => {
      Task.findByIdAndUpdate.mockResolvedValue([{ id: 1, name: 'comprar naranjas', completed: false }]);

      await updateById(req, res);

      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'comprar naranjas', completed: false }]);
    });
    test('should get an error', async () => {
      Task.findByIdAndUpdate.mockRejectedValue('error');

      await updateById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call deleteById function', () => {
    const req = {
      params: {
        taskId: 1
      }
    };
    test('should get delete one task by id', async () => {
      Task.findByIdAndDelete.mockResolvedValue(1);

      await deleteById(req, res);

      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'comprar naranjas', completed: false }]);
    });

    test('should get an error', async () => {
      Task.findByIdAndDelete.mockRejectedValue('error');

      await deleteById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });
});
