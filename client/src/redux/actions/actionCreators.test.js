import axios from 'axios';
import {
  addTask, loadTasks, deleteTask, updateTask, doneTask,
} from './actionCreators';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('loadTask', () => {
  const dispatch = jest.fn();

  test('should dispatch a task', async () => {
    axios.mockResolvedValue({ data: { name: 'comprar leche', completed: false } });

    await loadTasks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_TASKS,
      tasks: { name: 'comprar leche', completed: false },
    });
  });
  test('should dispatch an error', async () => {
    axios.mockRejectedValue();

    await loadTasks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'ERROR' });
  });
});

describe('addTask', () => {
  const dispatch = jest.fn();

  test('should add a new task', async () => {
    axios.post.mockResolvedValue({ data: { name: 'comprar chocolate', completed: false } });

    await addTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_TASK,
      tasks: { name: 'comprar chocolate', completed: false },
    });
  });
  test('should dispatch an error', async () => {
    axios.mockRejectedValue();

    await addTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'ERROR' });
  });
});

describe('deleteTask', () => {
  const dispatch = jest.fn();

  test('shoud get a taskId to delete this task', async () => {
    axios.delete.mockResolvedValue();

    await deleteTask(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_TASK,
      taskId: 1,
    });
  });
  test('should get an error', async () => {
    axios.delete.mockRejectedValue();

    await deleteTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR',
    });
  });
});

describe('updateTask', () => {
  const dispatch = jest.fn();

  test('should update one task', async () => {
    axios.put.mockResolvedValue({ data: { name: 'comprar chocolate con leche', completed: false } });

    await updateTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_TASK,
      data: { name: 'comprar chocolate con leche', completed: false },
    });
  });
  test('should get an error', async () => {
    axios.put.mockRejectedValue();

    await updateTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR',
    });
  });
});

describe('doneTask', () => {
  const dispatch = jest.fn();
  test('should change task to done', async () => {
    axios.put.mockResolvedValue();

    await doneTask(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DONE_TASK,
      taskId: 1,
    });
  });

  test('should get an error', async () => {
    axios.put.mockRejectedValue();

    await doneTask()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR',
    });
  });
});
