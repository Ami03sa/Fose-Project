import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateDisaster from "../src/components/CreateDisaster"; // adjust path if needed
import { BrowserRouter as Router } from "react-router-dom";

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe("CreateDisaster Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {}); // mock alert
    jest.spyOn(console, "log").mockImplementation(() => {});  // mock console.log
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders form elements", () => {
    renderWithRouter(<CreateDisaster />);

    expect(screen.getByText(/Create New Disaster Event/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Disaster Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Disaster/i)).toBeInTheDocument();
  });

  test("submits form with correct input values", () => {
    renderWithRouter(<CreateDisaster />);

    const nameInput = screen.getByLabelText(/Disaster Name/i);
    const locationInput = screen.getByLabelText(/Location/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByText(/Create Disaster/i);

    fireEvent.change(nameInput, { target: { value: "Earthquake" } });
    fireEvent.change(locationInput, { target: { value: "Los Angeles" } });
    fireEvent.change(descriptionInput, { target: { value: "A severe earthquake hit LA." } });

    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith({
      disasterName: "Earthquake",
      location: "Los Angeles",
      description: "A severe earthquake hit LA.",
    });

    expect(window.alert).toHaveBeenCalledWith("Disaster created successfully!");

    // Check if form is reset
    expect(nameInput.value).toBe("");
    expect(locationInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });
});
