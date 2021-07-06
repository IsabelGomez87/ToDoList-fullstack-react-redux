/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import TaskSite from './TaskSite';
import { deleteTask, modifyTask, PrintTask } from '../redux/actions/actionCreators';
import actionTypes from '../redux/actions/actionTypes';

jest.mock('../redux/actions/actionCreators');

describe('Given a TaskSite component', () => {
  describe('When is redered with empty initial state', () => {
    test('Then \'No Tasks\' should be in the document', () => {
      const initialState = { tasks: [] };
      PrintTask.mockReturnValueOnce({ type: actionTypes.PRINT_TASK, task: [] });

      render(<TaskSite />, { initialState });

      expect(screen.getByText(/No Tasks/i)).toBeInTheDocument();
    });
  });

  describe('When is redered with one task', () => {
    let initialState;
    beforeEach(() => {
      initialState = { tasks: [{ id: 1, task: 'Learn Javascript' }] };
      render(<TaskSite />, { initialState });
    });

    describe('And delete button is clicked', () => {
      test('Then trashTask should be invoked', () => {
        deleteTask.mockImplementationOnce(() => ({ type: actionTypes.DELETE_TASK }));

        fireEvent.click(screen.getByText(/Delete/i));

        expect(deleteTask).toHaveBeenCalledTimes(1);
      });
    });

    describe('And modify button is clicked', () => {
      test('Then doneTask should be invoked', () => {
        const button = screen.getByTestId('done-button-1');
        const doneElement = screen.getByTestId('task-1');

        fireEvent.click(button);

        expect(doneElement.classList.contains('done')).toBe(true);
      });
    });

    describe('And done button is clicked', () => {
      test('Then editTask should be invoked', () => {
        // arrange
        const button = screen.getByTestId('task-site-modify-button-1');
        modifyTask.mockReturnValueOnce({
          type: actionTypes.MODIFY_TASK,
          task: { id: 1, task: 'I know Javascript' },
        });

        // act
        fireEvent.click(button);

        // assert
        expect(modifyTask).toHaveBeenCalledTimes(1);
      });
    });
  });
});
