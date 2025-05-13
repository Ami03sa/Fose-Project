import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgetPassword from "../components/ForgetPassword";
import { BrowserRouter as Router } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

// Enable fetch mocking
fetchMock.enableMocks();

describe("ForgetPassword Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it("should render the Forget Password form", () => {
    render(
      <Router>
        <ForgetPassword />
      </Router>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm New Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });

  it("should show an error message if passwords do not match", async () => {
    render(
      <Router>
        <ForgetPassword />
      </Router>
    );

    // Input email and passwords
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/New Password/i), { target: { value: "newpassword123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: "differentpassword123" } });

    // Click the reset password button
    fireEvent.click(screen.getByText(/Reset Password/i));

    // Wait for the error message
    await waitFor(() => expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument());
  });

  it("should call the reset password API and show success message", async () => {
    // Mock fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );

    render(
      <Router>
        <ForgetPassword />
      </Router>
    );

    // Input email and passwords
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/New Password/i), { target: { value: "newpassword123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: "newpassword123" } });

    // Click the reset password button
    fireEvent.click(screen.getByText(/Reset Password/i));

    // Wait for success message
    await waitFor(() => expect(screen.getByText(/Password reset successfully/i)).toBeInTheDocument());
  });

  it("should show an error message if the API fails", async () => {
    // Mock fetch failure response
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: "Error resetting password" }),
      { status: 400 }
    );

    render(
      <Router>
        <ForgetPassword />
      </Router>
    );

    // Input email and passwords
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/New Password/i), { target: { value: "newpassword123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: "newpassword123" } });

    // Click the reset password button
    fireEvent.click(screen.getByText(/Reset Password/i));

    // Wait for error message
    await waitFor(() => expect(screen.getByText(/Error resetting password/i)).toBeInTheDocument());
  });

  it("should show a generic error message if there is a network issue", async () => {
    // Mock network failure
    fetchMock.mockRejectOnce(new Error("Network error"));

    render(
      <Router>
        <ForgetPassword />
      </Router>
    );

    // Input email and passwords
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/New Password/i), { target: { value: "newpassword123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm New Password/i), { target: { value: "newpassword123" } });

    // Click the reset password button
    fireEvent.click(screen.getByText(/Reset Password/i));

    // Wait for generic error message
    await waitFor(() => expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument());
  });
});
