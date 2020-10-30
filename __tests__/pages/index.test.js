import React from 'react';
import Chance from 'chance';
import fetch from 'isomorphic-unfetch';
import {fireEvent, render, createEvent} from '@testing-library/react';

import Home from '../../pages';

jest.mock('isomorphic-unfetch');

const chance = new Chance();

describe('Home', () => {
    let testRenderer,
        expectedEmail,
        expectedMessage;

    beforeEach(() => {
        testRenderer = render(<Home />);

        expectedEmail = chance.email();
        expectedMessage = chance.sentence();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('email', () => {
        test('should initialize with empty field and correct placeholder', () => {
            const {getByLabelText} = testRenderer;
            const emailInput = getByLabelText('email');

            expect(emailInput.value).toBe('');
            expect(emailInput.placeholder).toBe('Enter recipient email address');
        });

        test('should update input field on change', () => {
            const {getByLabelText} = testRenderer;
            const emailInput = getByLabelText('email');

            fireEvent.change(emailInput, { target: { value:  expectedEmail} })

            expect(emailInput.value).toBe(expectedEmail);
        });
    });

    describe('message', () => {
        test('should initialize with empty field', () => {
            const {getByLabelText} = testRenderer;
            const messageInput = getByLabelText('message');

            expect(messageInput.value).toBe('');
            expect(messageInput.placeholder).toBe('Enter secret message');
        });

        test('should update input field on change', () => {
            const {getByLabelText} = testRenderer;
            const messageInput = getByLabelText('message');

            fireEvent.change(messageInput, { target: { value:  expectedMessage} })

            expect(messageInput.value).toBe(expectedMessage);
        });
    });

    describe('on save', () => {
        beforeEach(() => {
            const {getByLabelText, getByText} = testRenderer;
            
            const submitButton = getByText('Save');
            const emailInput = getByLabelText('email');
            const messageInput = getByLabelText('message');
            
            fireEvent.change(emailInput, { target: { value:  expectedEmail} })
            fireEvent.change(messageInput, { target: { value:  expectedMessage} })
            fireEvent.click(submitButton);
        });

        test("should prevent default", () => {
            const {getByText} = testRenderer;
            
            const submitButton = getByText('Save');
            const myEvent = createEvent.click(submitButton);

            fireEvent(submitButton, myEvent);

            expect(myEvent.defaultPrevented).toBe(true);
         });

        test('should post message and email', () => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('/api', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: expectedEmail,
                    message: expectedMessage
                }),
            });
        });
    });
});
