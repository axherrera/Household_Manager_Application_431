/* eslint-disable testing-library/prefer-screen-queries */

import { jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Login from './Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';
import Dashboard from './dashboard/Routes';
import Signup from './Signup';

let container;

beforeEach(() => {
    process.env.REACT_APP_MOCK = true;
    container = document.createElement('div');
    document.body.appendChild(container);
  });


test('user stays in signup page after trying to sign up without filling in all fields', async () => {
    const user = userEvent.setup();
    const route = '/';
    const { getByRole } = render(<MemoryRouter initialEntries={[route]}><Signup /></MemoryRouter>);
    const signupButton = getByRole('button');

    user.click(signupButton);

    expect(screen.getByText(/Register New Account/i)).toBeInTheDocument()
});

test('User signs up with all fields filled and goes back to sign in page', async () => {
    process.env.REACT_APP_MOCK=true

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        ReactDOM.createRoot(container).render(<MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<Signup />} />
            </Routes>
        </MemoryRouter>);
    });

    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText('Username', {exact:false});
    await user.type(usernameInput, 'user1');
    expect(usernameInput).toHaveValue('user1');

    const passwordInput = screen.getByLabelText('Password', {exact:false});
    await user.type(passwordInput, 'password1');
    expect(passwordInput).toHaveValue('password1');

    const fNameInput = screen.getByLabelText('First Name', {exact:false});
    await user.type(fNameInput, 'Bob');
    expect(fNameInput).toHaveValue('Bob');

    const lNameInput = screen.getByLabelText('Last Name', {exact:false});
    await user.type(lNameInput, 'Build');
    expect(lNameInput).toHaveValue('Build');

    const householdInput = screen.getByLabelText('Household ID', {exact:false});
    await user.type(householdInput, '3');
    expect(householdInput).toHaveValue('3');

    await user.click(screen.getByRole('button', {name: 'Register User'}));

    await waitFor(() => {
        // eslint-disable-next-line testing-library/await-async-query
        screen.findByText(/Sign In/i);
    })
});