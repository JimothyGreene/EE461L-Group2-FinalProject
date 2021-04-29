import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUp } from '../components/SignUp';
import api from '../util/api';
import { AuthContext } from '../components/AuthContext';

describe('Resources', () => {
    //jest.mock('../util/api', () => ({ api: jest.fn() }));

    it('check if signup is displayed', () => {
        const { getByTestId } = render(
            <AuthContext.Provider value={false}>
                <SignUp />
            </AuthContext.Provider>
        );
        const firstName = getByTestId('firstName');
        const lastName = getByTestId('lastName');
        const email = getByTestId('email');
        const password = getByTestId('password');

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    })

    // it('checks if api is called', () => {
    //     const attemptSignUp = jest.spyOn(global, "attemptSignUp").mockImplementation(() => {return});
    //     const { getByTestId } = render(<SignUp />);
    //     const signup = getByTestId('signup');

    //     fireEvent.click(signup);

    //     expect(attemptSignUp).toHaveBeenCalled();
    // })
})