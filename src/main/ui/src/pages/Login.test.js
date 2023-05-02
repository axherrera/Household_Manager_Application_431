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


test('user stays in login page after logging in without username and password', async () => {
    const user = userEvent.setup();

    const route = '/';
    const { getByRole } = render(<MemoryRouter initialEntries={[route]}><Login /></MemoryRouter>);
    const loginButton = getByRole('button');
    
    user.click(loginButton);
    
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
});

test('User Logs in with correct credentials and goes to Dashboard', async () => {
    process.env.REACT_APP_MOCK=true

    act(() => {
        ReactDOM.createRoot(container).render(<MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </MemoryRouter>);
    });
    
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, 'user1');
    expect(usernameInput).toHaveValue('user1');

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password1');
    expect(passwordInput).toHaveValue('password1');

    await user.click(screen.getByRole('button', {name: 'login'}));

    await waitFor(() => {
        screen.findByText(/welcome/i);
    })
});
