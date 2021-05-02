import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Projects from '../components/Projects';
import api from '../util/api';
import { AuthContext } from '../components/AuthContext';


describe('Resources', () => {

    jest.mock('../util/api', () => ({ api: jest.fn() }));
    
    it('check if newProjectID/joinProjectButton is displayed', () => {
        const { getByTestId } = render(
            <AuthContext.Provider value={{ projectID: null }}>
                <Projects />
            </AuthContext.Provider>
        );
        const joinProjectText = getByTestId('joinProjectText');
        const joinProjectButton = getByTestId('joinProjectButton');
        const newProjectName = getByTestId('newProjectName');
        const newProjectID = getByTestId('newProjectID');
        const newProjectDesc = getByTestId('newProjectDesc');
        const projectSelect = getByTestId('projectSelect');

        expect(joinProjectText).toBeInTheDocument();
        expect(joinProjectButton).toBeInTheDocument();
        expect(newProjectName).toBeInTheDocument();
        expect(newProjectID).toBeInTheDocument();
        expect(newProjectDesc).toBeInTheDocument();
        expect(projectSelect).toBeInTheDocument();
    });

    // it('checks the resource select' , () => {
    //     Resources.resourceSelected = jest.fn();
    //     const { getByTestId } = render(<Resources />);
    //     const resourceSelect = getByTestId('resourceSelect');

    //     fireEvent.change(resourceSelect, { target: { value: 'a' } });

    //     expect(Resources.resourceSelected).toHaveBeenCalled();
    // });
})