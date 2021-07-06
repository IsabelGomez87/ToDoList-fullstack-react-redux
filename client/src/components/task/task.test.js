/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { fireEvent, render, screen } from '../../assets/test.utils';
import {
  loadTasks, addTask, deleteTask, updateTask, doneTask,
} from '../../redux/actions/actionCreators';
import Task from './Task';
import actionTypes from '../../redux/actions/actionTypes';

jest.mock('../../redux/actions/actionCreators');

describe('Given a Task component', () => {
  describe('When is redered with empty initial state', () => {
    test('then \'Add task\' should be in the document', () => {
      const initialState = { tasks: [] };
      loadTasks.mockReturnValue({
        type: actionTypes.LOAD_TASKS,
        tasks: [],
      });
      render(<Task />, { initialState });

      const input = screen.getByTestId('add-input-1');

      fireEvent.change(input, { target: { value: 'comprar leche' } });

      expect(screen.getByText(/Add task/i)).toBeInTheDocument();
    });
  });

  describe('When is redered with a one task', () => {
    let initialState;
    beforeEach(() => {
      initialState = { tasks: [{ name: 'comprar leche', completed: false }] };
      render(<Task />, { initialState });
    });
    describe('And Add Task button is clicked', () => {
      test('then \'comprar leche\' should be in the document', () => {
        addTask.mockReturnValue(() => ({
          type: actionTypes.ADD_TASK,
          tasks: initialState.tasks,
        }));
        fireEvent.click(screen.getByText(/Add task/i));
        expect(screen.getByText(/comprar leche/i)).toBeInTheDocument();
      });
    });

    describe('And Delete Task button is clicked', () => {
      test('then deleteTask should be invoked', () => {
        const button = screen.getByTestId('delete-button-1');
        deleteTask.mockImplementation(() => (
          { type: actionTypes.DELETE_TASK }
        ));

        fireEvent.click(button);

        expect(deleteTask).toHaveBeenCalled();
      });
    });

    describe('And Edit Task button is clicked', () => {
      test('then updateTask should be invoked', () => {
        const buttonEdit = screen.getByTestId('edit-button-1');

        fireEvent.click(buttonEdit);

        const buttonUpdate = screen.getByTestId('update-button-1');

        updateTask.mockReturnValue(() => (
          {
            type: actionTypes.UPDATE_TASK,
            data: { name: 'comprar leche', completed: false },
          }
        ));

        fireEvent.click(buttonUpdate);

        expect(updateTask).toHaveBeenCalled();
      });
    });

    describe('And Done Task button is clicked', () => {
      test('then doneTask should be invoked', () => {
        const button = screen.getByTestId('finished-button-1');
        doneTask.mockImplementation(() => ({
          type: actionTypes.DONE_TASK,
        }));

        fireEvent.click(button);

        expect(doneTask).toHaveBeenCalled();
      });
    });
  });
});
