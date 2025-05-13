import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Match from "../components/Match";
import axios from "axios";

// Mock the axios GET and POST methods
jest.mock("axios");

describe("Match Component", () => {
  it("should render the Match component", () => {
    render(<Match />);

    // Check if page title is displayed
    expect(screen.getByText(/Match Requests/i)).toBeInTheDocument();
  });

  it("should load requests and pledges on component mount", async () => {
    // Mock successful GET responses
    axios.get.mockResolvedValueOnce({
      data: { requests: [{ id: 1, name: "Request 1", contact: "123", location: "Location 1" }] },
    }).mockResolvedValueOnce({
      data: { pledges: [{ id: 1, name: "Pledge 1", contact: "456", assistance_type: "Food" }] },
    });

    render(<Match />);

    // Wait for the requests and pledges to be loaded
    await waitFor(() => screen.getByText("Request 1"));
    await waitFor(() => screen.getByText("Pledge 1"));

    expect(screen.getByText("Request 1")).toBeInTheDocument();
    expect(screen.getByText("Pledge 1")).toBeInTheDocument();
  });

  it("should allow selecting a request", async () => {
    // Mock successful GET responses
    axios.get.mockResolvedValueOnce({
      data: { requests: [{ id: 1, name: "Request 1" }] },
    }).mockResolvedValueOnce({
      data: { pledges: [{ id: 1, name: "Pledge 1" }] },
    });

    render(<Match />);

    // Wait for requests to be displayed
    await waitFor(() => screen.getByText("Request 1"));

    const requestCard = screen.getByText("Request 1");
    fireEvent.click(requestCard);

    // Ensure the request is selected
    expect(requestCard).toHaveClass("selected");
  });

  it("should allow selecting a pledge", async () => {
    // Mock successful GET responses
    axios.get.mockResolvedValueOnce({
      data: { requests: [{ id: 1, name: "Request 1" }] },
    }).mockResolvedValueOnce({
      data: { pledges: [{ id: 1, name: "Pledge 1" }] },
    });

    render(<Match />);

    // Wait for pledges to be displayed
    await waitFor(() => screen.getByText("Pledge 1"));

    const pledgeCard = screen.getByText("Pledge 1");
    fireEvent.click(pledgeCard);

    // Ensure the pledge is selected
    expect(pledgeCard).toHaveClass("selected");
  });

  it("should match selected request and pledge", async () => {
    // Mock successful GET responses
    axios.get.mockResolvedValueOnce({
      data: { requests: [{ id: 1, name: "Request 1" }] },
    }).mockResolvedValueOnce({
      data: { pledges: [{ id: 1, name: "Pledge 1" }] },
    });

    // Mock POST response for match
    axios.post.mockResolvedValueOnce({});

    render(<Match />);

    // Wait for requests and pledges to be displayed
    await waitFor(() => screen.getByText("Request 1"));
    await waitFor(() => screen.getByText("Pledge 1"));

    // Select a request and a pledge
    fireEvent.click(screen.getByText("Request 1"));
    fireEvent.click(screen.getByText("Pledge 1"));

    // Click match button
    fireEvent.click(screen.getByText("Match Selected Request and Pledge"));

    // Ensure match was successful
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/match", {
      requestId: 1,
      pledgeId: 1,
    }));

    // Check alert is shown
    expect(window.alert).toHaveBeenCalledWith("Match successful!");
  });

  it("should show an alert if no request or pledge is selected when matching", async () => {
    // Mock successful GET responses
    axios.get.mockResolvedValueOnce({
      data: { requests: [{ id: 1, name: "Request 1" }] },
    }).mockResolvedValueOnce({
      data: { pledges: [{ id: 1, name: "Pledge 1" }] },
    });

    render(<Match />);

    // Wait for requests and pledges to be displayed
    await waitFor(() => screen.getByText("Request 1"));
    await waitFor(() => screen.getByText("Pledge 1"));

    // Do not select anything
    fireEvent.click(screen.getByText("Match Selected Request and Pledge"));

    // Check that alert is shown
    expect(window.alert).toHaveBeenCalledWith("Please select both a request and a pledge.");
  });
});
