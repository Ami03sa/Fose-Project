import { render, screen, fireEvent } from "@testing-library/react";
import RequestDash from "../components/RequestDash";
import { BrowserRouter } from "react-router-dom";

// Helper to wrap component with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("RequestDash Component", () => {
  it("renders the dashboard title", () => {
    renderWithRouter(<RequestDash />);
    expect(screen.getByText(/Recipient Dashboard/i)).toBeInTheDocument();
  });

  it("displays navigation cards", () => {
    renderWithRouter(<RequestDash />);
    expect(screen.getByText(/Create Request/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Request Items/i)).toBeInTheDocument();
  });

  it("navigates on card click", () => {
    renderWithRouter(<RequestDash />);
    const createRequestCard = screen.getByText(/Create Request/i);
    fireEvent.click(createRequestCard);
  
  });
});
