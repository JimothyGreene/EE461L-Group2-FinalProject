import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Resources from '../components/Resources';
import api from '../util/api';

describe('Resources', () => {

    jest.mock('../util/api', () => ({ api: jest.fn() }));
    
    it('check if checkin/checkout is displayed', () => {
        const { getByTestId } = render(<Resources />);
        const quantityOut = getByTestId('quantityOut');
        const checkout = getByTestId('checkout');
        const quantityIn = getByTestId('quantityIn');
        const checkin = getByTestId('checkin');
        const resourceSelect = getByTestId('resourceSelect');

        expect(quantityOut).toBeInTheDocument();
        expect(checkout).toBeInTheDocument();
        expect(quantityIn).toBeInTheDocument();
        expect(checkin).toBeInTheDocument();
        expect(resourceSelect).toBeInTheDocument();
    });

    // it('checks the resource select' , () => {
    //     Resources.resourceSelected = jest.fn();
    //     const { getByTestId } = render(<Resources />);
    //     const resourceSelect = getByTestId('resourceSelect');

    //     fireEvent.change(resourceSelect, { target: { value: 'a' } });

    //     expect(Resources.resourceSelected).toHaveBeenCalled();
    // });
})