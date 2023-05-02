/* eslint-disable testing-library/prefer-screen-queries */

import { jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import TableData from './ChoresHome';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';

test('renders Chores Page', () => {
    render(<TableData/>);
    expect(screen.getByRole("heading")).toHaveTextContext(/Chores/i);
})