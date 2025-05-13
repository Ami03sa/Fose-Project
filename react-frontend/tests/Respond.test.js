// Respond.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Respond from "../src/components/Respond"; // adjust path if needed

beforeEach(() => {
  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          requests: [
            {
              id: 1,
              name: "John Doe",
              contact: "123-456-7890",
              location: "City A",
              emergency_type: "Flood",
              urgency_level: "High",
              help_categories: "Food, Water",
              details: "Need clean drinking water."
            }
          ]
        })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders Respond page and submits response", async () => {
  render(<Respond />);

  // Wait for request to load
  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  // Fill form
  fireEvent.change(screen.getByLabelText(/Name:/i), {
    target: { value: "Jane Responder" }
  });
  fireEvent.change(screen.getByLabelText(/Contact Information:/i), {
    target: { value: "987-654-3210" }
  });
  fireEvent.change(screen.getByLabelText(/Type of Assistance:/i), {
    target: { value: "foodAndWater" }
  });
  fireEvent.change(screen.getByLabelText(/Specify Quantities and Details:/i), {
    target: { value: "50 bottles of water" }
  });

  // Submit form
  fireEvent.click(screen.getByRole("button", { name: /Submit Response/i }));

  // Check thank you message
  expect(
    await screen.findByText(/Thank you for your response!/i)
  ).toBeInTheDocument();
});
