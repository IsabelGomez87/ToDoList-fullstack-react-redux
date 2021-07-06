import axios from 'axios';
import actionTypes from './actionTypes';
import {
  loadTasks, createTask, deleteTask, updateTask,
} from './actionCreators';

jest.mock('axios');

describe('Given a loadTasks action creator', () => {
  describe('When it is called by the dispatcher and the response is OK', () => {
    test('Then should load a list of tasks', async () => {
      const tasks = {
        data: [{ name: 'task 1' }],
      };

      axios.mockResolvedValue(tasks);

      const dispatch = jest.fn();
      await loadTasks()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: actionTypes.LOAD_TASKS,
          tasks: [{ name: 'task 1' }],
        },
      );
    });
  });

  describe('When it is called by the dispatcher and the response is NOK', () => {
    test('Then should dispatch an error', async () => {
      axios.mockRejectedValue();

      const dispatch = jest.fn();
      await loadTasks()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: actionTypes.LOAD_TASKS_ERROR,
        },
      );
    });
  });
});

describe('Given a createTask action creator', () => {
  describe('When it is called by the dispatcher and the response is OK', () => {
    test('Then should create a new task', async () => {
      const task = {
        data: {
          name: 'New task',
        },
      };

      axios.post.mockResolvedValue(task);
      const dispatch = jest.fn();

      await createTask()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ADD_TASK,
        task: task.data,
      });
    });

    describe('When it is called by the dispatcher and the response is NOK', () => {
      test('Then should dispatch an error', async () => {
        axios.post.mockRejectedValue();
        const dispatch = jest.fn();

        await createTask()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.ADD_TASK_ERROR,
        });
      });
    });
  });
});

describe('Given a deleteTask action creator', () => {
  test('Should delete a task', async () => {
    axios.delete.mockResolvedValue();
    const dispatch = jest.fn();

    await deleteTask(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_TASK,
      taskId: 1,
    });
  });

  test('Dispatch an error', async () => {
    axios.delete.mockRejectedValue();
    const dispatch = jest.fn();

    await deleteTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_TASK_ERROR,
    });
  });
});

describe('Given a updateTask action creator', () => {
  test('Should update a task', async () => {
    const task = {
      data: {
        name: 'Upated task',
        isFinished: true,
      },
    };
    axios.put.mockResolvedValue(task);
    const dispatch = jest.fn();

    await updateTask(task)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_TASK,
      task: task.data,
    });
  });

  test('Dispatch an error', async () => {
    axios.put.mockRejectedValue();
    const dispatch = jest.fn();

    await updateTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_TASK_ERROR,
    });
  });
});
