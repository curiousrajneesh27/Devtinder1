import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Header from "../src/components/Common/Header";

describe("Header Component", () => {
    it("should render header", () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(screen.getByText(/DevTinder/i)).toBeDefined();
    });
});
