import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

beforeEach(() => {
    render(<ContactForm/>)
})

test('renders without errors', () => {

});

test('renders the contact form header', () => {  
    const header = screen.queryByText('Contact Form', { exact: false });
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent('Contact Form', { exact: false })
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "ab")
    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const submitBtn = screen.getByRole("button")
    userEvent.click(submitBtn)
    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error')
        expect(errorMessages).toHaveLength(3)
    })

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName, "abcde")
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName, "abc")
    const submitBtn = screen.getByRole('button')
    userEvent.click(submitBtn)
    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, "foo@gmail")
    const errorMessage = await screen.findByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
