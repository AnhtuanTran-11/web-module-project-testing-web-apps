import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const formHeader = screen.getByText(/contact form/i);
  expect(formHeader).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByPlaceholderText(/Edd/i);
  userEvent.type(firstNameInput, "Tuan");

  await waitFor(() => {
    const errorMessage = screen.getByTestId("error");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submit = screen.getByRole("button");
  userEvent.click(submit);
  const errorMessages = screen.queryAllByTestId("error");
  expect(errorMessages.length).toBe(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "Albert");
  const lastName = screen.getByLabelText(/last name/i);
  userEvent.type(lastName, "Einstein");
  const submit = screen.getByRole("button");
  userEvent.click(submit);
  const emailError = screen.queryByTestId("error");
  expect(emailError).toHaveTextContent(
    /Error: email must be a valid email address./i
  );
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "google.com");
  const emailError = screen.queryByTestId("error");
  expect(emailError).toHaveTextContent(
    /Error: email must be a valid email address./i
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
render(<ContactForm/>)
  const submit = screen.getByRole("button");
  userEvent.click(submit);
  const emailError = screen.queryAllByTestId("error");
  expect(emailError[1]).toHaveTextContent(/Error: lastName is a required field./i);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Albert");
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Einstein");
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, "aol@aol.com");
    const submit = screen.getByRole("button");
    userEvent.click(submit);


    const firstNameDisplay = screen.queryByTestId("firstnameDisplay");
    const lastnameDisplay = screen.queryByTestId("lastnameDisplay")
    const emailDisplay = screen.queryByTestId("emailDisplay");
    const messageDisplay = screen.queryByTestId("messageDisplay")

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
})

test("renders all fields text when all fields are submitted.", async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Albert");
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Einstein");
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, "aol@aol.com");
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, "This is the message");
    const submit = screen.getByRole("button");
    userEvent.click(submit);


    const firstNameDisplay = screen.queryByTestId("firstnameDisplay");
    const lastnameDisplay = screen.queryByTestId("lastnameDisplay")
    const emailDisplay = screen.queryByTestId("emailDisplay");
    const messageDisplay = screen.queryByTestId("messageDisplay");

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();

});
