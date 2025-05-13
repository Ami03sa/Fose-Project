// Signup.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../src/components/Signup"; // adjust path if needed
import { BrowserRouter } from "react-router-dom";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

beforeEach(() => {
  // Mock fetch for signup
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Signup successful" })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders signup form and submits successfully", async () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@example.com" }
  });
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: "testuser" }
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "password123" }
  });

  // Submit form
  fireEvent.click(screen.getByRole("button", { name: /signup/i }));

  // Wait for navigation and alert
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });
});
