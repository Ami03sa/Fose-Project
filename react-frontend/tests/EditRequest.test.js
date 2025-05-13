import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditRequest from "../src/components/EditRequest"; // adjust path as needed
import { BrowserRouter as Router } from "react-router-dom";

// Mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe("EditRequest Component", () => {
  const mockRequests = [
    {
      _id: "abc123",
      name: "John Doe",
      contact: "1234567890",
      location: "New York",
      emergencyType: "flood",
      urgencyLevel: "urgent",
      helpCategories: ["foodAndWater"],
      details: "Need food and water supplies.",
    },
  ];

  test("displays list of requests", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    renderWithRouter(<EditRequest />);

    expect(await screen.findByText(/Emergency Type:/)).toBeInTheDocument();
    expect(screen.getByText(/Urgency:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  test("shows editable form on clicking edit", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    renderWithRouter(<EditRequest />);

    fireEvent.click(await screen.findByRole("button", { name: /edit/i }));

    expect(await screen.findByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("New York")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Need food and water supplies.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("urgent")).toBeInTheDocument();
    expect(screen.getByLabelText(/food and water/i).checked).toBe(true);
  });

  test("submits updated request", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Update success" }),
      });

    renderWithRouter(<EditRequest />);

    fireEvent.click(await screen.findByRole("button", { name: /edit/i }));

    await waitFor(() => expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument());

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const submitBtn = screen.getByRole("button", { name: /update request/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/update-request/abc123"),
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });

    expect(await screen.findByText(/Request updated successfully!/)).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch failed"));

    renderWithRouter(<EditRequest />);

    expect(await screen.findByText(/Error loading requests/i)).toBeInTheDocument();
  });
});
