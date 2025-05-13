import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import axios from "axios";

// Mock the axios POST method
jest.mock("axios");

describe("Login Component", () => {
  it("should render the Login component", () => {
    render(<Login />);

    // Check if the Login title is displayed
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("should allow the user to input email and password", () => {
    render(<Login />);

    // Find the email and password fields
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Simulate typing into the input fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assert that the values are correctly reflected in the fields
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should call the login API when the login button is clicked", async () => {
    // Mock POST response
    axios.post.mockResolvedValueOnce({ data: { message: "Login successful" } });

    render(<Login />);

    // Input email and password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    // Click the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the POST request to be called
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/login", {
      email: "test@example.com",
      password: "password123",
    }));

    // Check if success message is shown (if any)
    expect(window.alert).toHaveBeenCalledWith("Login successful");
  });

  it("should show an error alert when the login fails", async () => {
    // Mock POST error response
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Login failed" } } });

    render(<Login />);

    // Input email and password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    // Click the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the error alert to be triggered
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Login failed"));
  });

  it("should show an alert if email or password is missing", () => {
    render(<Login />);

    // Click the login button without filling in email and password
    fireEvent.click(screen.getByText("Login"));

    // Check that an alert is shown
    expect(window.alert).toHaveBeenCalledWith("Please enter both email and password.");
  });
});
