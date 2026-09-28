import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../main.jsx";

describe("Frequent Flyer Portal", () => {
  it("shows the main portal interface and accessible navigation", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /frequent flyer portal/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /^Register$/i,
      })
    ).toBeInTheDocument();
  });

  it("shows a friendly empty state for an unmatched search", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /^Members$/i,
      })
    );

    const search = screen.getByRole("textbox", {
      name: /search members/i,
    });

    await user.type(search, "zzzz-not-found");

    expect(
      screen.getByText(/no data found/i)
    ).toBeInTheDocument();
  });

  it("blocks invalid submission and highlights fields", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /^Register$/i,
      })
    );

    const registerButton = screen.getByRole("button", {
      name: /^Register member$/i,
    });

    await user.click(registerButton);

    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);

    expect(
      screen.getByLabelText(/full name/i)
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("shows a loading state during valid registration", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /^Register$/i,
      })
    );

    await user.type(
      screen.getByLabelText(/full name/i),
      "Aisha Sharma"
    );

    await user.type(
      screen.getByLabelText(/membership id/i),
      "FF-555555"
    );

    await user.type(
      screen.getByLabelText(/email address/i),
      "aisha@example.com"
    );

    const registerButton = screen.getByRole("button", {
      name: /^Register member$/i,
    });

    await user.click(registerButton);

    // The button changes to "Saving..." immediately.
    expect(
      screen.getByRole("button", {
        name: /saving/i,
      })
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(
          screen.getByRole("status")
        ).toHaveTextContent(/added successfully/i);
      },
      { timeout: 2000 }
    );
  });
});