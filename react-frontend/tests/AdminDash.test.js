import { render, screen, fireEvent } from "@testing-library/react";
import AdminDash from "../src/components/AdminDash";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Admin Dashboard and all options", () => {
  render(
    <Router>
      <AdminDash />
    </Router>
  );

  expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Maintain Donation Items/i)).toBeInTheDocument();
  expect(screen.getByText(/Create Disaster Event/i)).toBeInTheDocument();
  expect(screen.getByText(/Manually Match Requests/i)).toBeInTheDocument();
  expect(screen.getByText(/Initiate Shipping Advice/i)).toBeInTheDocument();
});
