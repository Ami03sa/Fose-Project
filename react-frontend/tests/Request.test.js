import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Request from "../components/Request";
import axios from "axios";

jest.mock("axios");

describe("Request Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  it("renders the Request Help form", () => {
    render(<Request />);
    expect(screen.getByText(/Request Help/i)).toBeInTheDocument();
  });

  it("allows user to fill out and submit the form", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "Request submitted successfully!" },
    });

    render(<Request />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Contact Information/i), { target: { value: "555-1234" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "NYC" } });
    fireEvent.change(screen.getByLabelText(/Type of Emergency/i), { target: { value: "flood" } });
    fireEvent.change(screen.getByLabelText(/Urgency Level/i), { target: { value: "urgent" } });
    fireEvent.click(screen.getByLabelText(/Food and Water/i));
    fireEvent.change(screen.getByLabelText(/Specify Quantities and Details/i), {
      target: { value: "Need 50 bottles of water" },
    });

    fireEvent.click(screen.getByText(/Submit Request/i));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for submitting your request!/i)).toBeInTheDocument();
    });

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/request-help", expect.any(Object));
  });

  it("shows error if submission fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Server error"));

    render(<Request />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/Contact Information/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "LA" } });
    fireEvent.change(screen.getByLabelText(/Type of Emergency/i), { target: { value: "fire" } });
    fireEvent.change(screen.getByLabelText(/Urgency Level/i), { target: { value: "high" } });

    fireEvent.click(screen.getByText(/Submit Request/i));

    await waitFor(() => {
      expect(screen.getByText(/Fill out the form/i)).toBeInTheDocument();
    });
  });
});
