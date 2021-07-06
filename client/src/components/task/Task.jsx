/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadTasks, addTask, deleteTask, doneTask, updateTask,
} from '../../redux/actions/actionCreators';
import './task.css';

const Task = ({ dispatch, tasks }) => {
  useEffect(() => {
    if (!tasks?.length) dispatch(loadTasks());
  }, []);

  const [nameNewTask, setNameNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState('');

  const getImputTask = (event) => {
    setNameNewTask(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      name: nameNewTask,
      completed: false,
    };
    dispatch(addTask(newTask));
    setNameNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDoneTask = (taskId) => {
    dispatch(doneTask(taskId));
  };

  const handleEditTask = (taskName, taskId) => {
    setNameNewTask(taskName);
    setTaskIdToUpdate(taskId);
    setEditMode(true);
  };

  const handleUpdateTask = (taskId) => {
    const getNewTaskName = {
      name: nameNewTask,
    };
    dispatch(updateTask(taskId, getNewTaskName));
    setNameNewTask('');
    setEditMode(false);
  };

  return (
    <>
      <section>
        <label htmlFor="task-name" className="label-create">
          <input id="task-name" data-testid="add-input-1" onChange={getImputTask} value={nameNewTask} placeholder="Add your task here..." className="label-create__input" />
          {editMode
            ? (
              <button
                type="button"
                onClick={() => handleUpdateTask(taskIdToUpdate)}
                className="label-create__button"
                data-testid="update-button-1"
              >
                Update Task
              </button>
            )

            : (
              <button
                type="button"
                onClick={() => handleAddTask()}
                className="label-create__button"
                data-testid="create-button-1"
              >
                Add task
              </button>
            )}
        </label>
      </section>
      <section className="list">
        <ul className="list-container">
          {tasks?.map((element) => (
            <li key={element.id} className={!element.completed ? 'list-container__item' : 'list-container__item--done'}>
              {element.name}
              <div className="list-container__item-div">
                <button
                  type="button"
                  disabled={element.completed}
                  className="list__finished-button"
                  data-testid="finished-button-1"
                  onClick={() => handleDoneTask(element._id)}
                >
                  <i className={!element.completed ? 'far fa-check-circle' : 'far fa-check-circle bloqued'} />
                </button>
                <button
                  type="button"
                  className="list__edit-button"
                  data-testid="edit-button-1"
                  onClick={() => handleEditTask(element.name, element._id)}
                >
                  <i className="far fa-edit" />
                </button>
                <button
                  type="button"
                  className="list__delete-button"
                  data-testid="delete-button-1"
                  onClick={() => handleDeleteTask(element._id)}
                >
                  <i className="far fa-trash-alt" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (store) => ({
  tasks: store.tasks,
});

export default connect(mapStateToProps)(Task);
