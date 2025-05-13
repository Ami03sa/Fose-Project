import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DonationItemMaintenance from "../src/components/DonationItemMaintenance";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Setup mock adapter
const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset(); 
});

test("fetches and displays donation items", async () => {
  mock.onGet("/api/admin/donation-items").reply(200, [
    { id: 1, name: "Blankets", description: "Warm blankets", quantity: 100 },
  ]);

  render(
    <Router>
      <DonationItemMaintenance />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(/Blankets/i)).toBeInTheDocument();
  });
});

test("adds a new donation item", async () => {
  mock.onGet("/api/admin/donation-items").reply(200, []);
  mock.onPost("/api/admin/donation-items").reply(201);

  render(
    <Router>
      <DonationItemMaintenance />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Item Name/i), {
    target: { value: "Food" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Description/i), {
    target: { value: "Non-perishable food" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Quantity/i), {
    target: { value: "50" },
  });

  fireEvent.click(screen.getByText(/Add Donation Item/i));

  await waitFor(() => {
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
  });
});
