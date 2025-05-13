import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Pledge from "../components/Pledge";
import fetchMock from "jest-fetch-mock";

// Enable fetch mocking
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks(); // Reset before each test
});

describe("Pledge Component", () => {
  it("renders the pledge form with all fields", () => {
    render(<Pledge />);

    expect(screen.getByText(/Offer a Pledge/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Information:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Assistance:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Specify Quantities and Details:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit pledge/i })).toBeInTheDocument();
  });

  it("submits form successfully and shows thank you message", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Pledge received" }), { status: 200 });

    render(<Pledge />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Contact Information:/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Type of Assistance:/i), { target: { value: "foodAndWater" } });
    fireEvent.change(screen.getByLabelText(/Specify Quantities and Details:/i), {
      target: { value: "50 food packages" }
    });

    fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

    await waitFor(() =>
      expect(screen.getByText(/Thank you for your pledge!/i)).toBeInTheDocument()
    );
  });

  it("shows an error alert if the API returns an error", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Submission failed" }), { status: 400 });

    window.alert = jest.fn(); // Mock alert

    render(<Pledge />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/Contact Information:/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/Type of Assistance:/i), { target: { value: "medicalSupplies" } });
    fireEvent.change(screen.getByLabelText(/Specify Quantities and Details:/i), {
      target: { value: "20 medical kits" }
    });

    fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Submission failed");
    });
  });

  it("shows a generic error alert on network failure", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    window.alert = jest.fn(); // Mock alert

    render(<Pledge />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "Alex Smith" } });
    fireEvent.change(screen.getByLabelText(/Contact Information:/i), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText(/Type of Assistance:/i), { target: { value: "transportation" } });
    fireEvent.change(screen.getByLabelText(/Specify Quantities and Details:/i), {
      target: { value: "2 trucks" }
    });

    fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Something went wrong.");
    });
  });
});
