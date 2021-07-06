import axios from 'axios';
import actionTypes from './actionTypes';

const url = 'http://localhost:1305/to-do-list';

export function loadTasks() {
  return async (dispatch) => {
    try {
      const { data } = await axios(url);
      dispatch({
        type: actionTypes.LOAD_TASKS,
        tasks: data,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
      });
    }
  };
}

export function addTask(newTask) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(url, newTask);
      dispatch({
        type: actionTypes.ADD_TASK,
        tasks: data,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
      });
    }
  };
}

export function deleteTask(taskId) {
  return async (dispatch) => {
    try {
      await axios.delete(`${url}/${taskId}`);
      dispatch({
        type: actionTypes.DELETE_TASK,
        taskId,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
      });
    }
  };
}

export function updateTask(taskId, newTaskName) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${url}/${taskId}`, newTaskName);
      dispatch({
        type: actionTypes.UPDATE_TASK,
        data,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
      });
    }
  };
}

export function doneTask(taskId) {
  return async (dispatch) => {
    try {
      await axios.put(`${url}/${taskId}`, { completed: true });
      dispatch({
        type: actionTypes.DONE_TASK,
        taskId,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
      });
    }
  };
}
