import { render, screen } from "@testing-library/react";
import App from "./app";

describe('App render', () => {
  it("renders learn react link", () => {
    render(<App />);
    const title = screen.getByText(/мбоу алгосош/i);
    expect(title).toBeInTheDocument();
  });
})

