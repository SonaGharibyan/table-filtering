import React from "react";
import "../../matchMedia.mock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductsFilters } from "./ProductsFilters";
import { useMediaQuery } from "react-responsive";
import userEvent from "@testing-library/user-event";
import { getFilteredProducts } from "../../clients/productClient";
import data from '../../data.json'

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

const mockOnFilterChange = jest.fn();
const mockOnFinish = jest.fn();

describe("ProductsFilters Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMediaQuery.mockReturnValue(false);
  });

  test("renders product filters component", () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

  test("calls onFilterChange for name input", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const nameInput = screen.getByPlaceholderText(/Name/i);
    userEvent.type(nameInput, "Product A");

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith("name", "Product A");
    });
    expect(nameInput.value).toBe("Product A");
  });

  test("calls onFilterChange for category selection", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const categorySelect = screen.getByRole("combobox", { name: /Category/i });
    userEvent.click(categorySelect);
    const option = screen.getByTitle(/Electronics/i);
    userEvent.click(option);

    expect(mockOnFilterChange).toHaveBeenCalledWith("category", [
      "Electronics",
    ]);
  });

  test("calls onFilterChange for brand selection", () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const brandSelect = screen.getByRole("combobox", { name: /Brand/i });
    userEvent.click(brandSelect);
    const option = screen.getByTitle(/Brand C/i);
    userEvent.click(option);

    expect(mockOnFilterChange).toHaveBeenCalledWith("brand", ["Brand C"]);
  });

  test("calls onFilterChange for price slider", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const slider = screen.getAllByRole("slider", /Price/i);
    fireEvent.mouseDown(slider[1]);
    fireEvent.mouseMove(slider[1], { clientX: -50 });
    fireEvent.mouseUp(slider[1]);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith("price", [
        0,
        expect.any(Number),
      ]);
    });
  });

  test("calls onFilterChange for rating selection", () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const radioGroup = screen.getByRole("radiogroup");
    const ratingInputs = screen.getAllByRole("radio", radioGroup);
    userEvent.click(ratingInputs[3]);

    expect(mockOnFilterChange).toHaveBeenCalledWith("rating", 4);
  });
});

describe("ProductsFilters Mobile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMediaQuery.mockReturnValue(true);
  });

  test("renders product drawer with filters", () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

  test("calls onFinish for name input", async () => {
    useMediaQuery.mockReturnValue(true);
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );
    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    const nameInput = screen.getByPlaceholderText(/Name/i);
    userEvent.type(nameInput, "Product A");

    const applyFiltersButton = screen.getByText(/Apply/i);
    userEvent.click(applyFiltersButton);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith(expect.objectContaining({ name: "Product A" }));
    });
  });

  test("calls onFinish for category selection", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    const categorySelect = screen.getByRole("combobox", { name: /Category/i });
    userEvent.click(categorySelect);
    const option = screen.getByTitle(/Electronics/i);
    userEvent.click(option);

    const applyFiltersButton = screen.getByText(/Apply/i);
    userEvent.click(applyFiltersButton);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith(expect.objectContaining({ category: ["Electronics"] }));
    });
  });

  test("calls onFinish for brand selection", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    const brandSelect = screen.getByRole("combobox", { name: /Brand/i });
    userEvent.click(brandSelect);
    const option = screen.getByTitle(/Brand C/i);
    userEvent.click(option);

    const applyFiltersButton = screen.getByText(/Apply/i);
    userEvent.click(applyFiltersButton);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith(expect.objectContaining({ brand: ["Brand C"] }));
    });
  });

  test("calls onFinish for price slider", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    const slider = screen.getAllByRole("slider", /Price/i);
    fireEvent.mouseDown(slider[1]);
    fireEvent.mouseMove(slider[1], { clientX: -50 });
    fireEvent.mouseUp(slider[1]);

    const applyFiltersButton = screen.getByText(/Apply/i);
    userEvent.click(applyFiltersButton);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith({
        price: [0, expect.any(Number)],
      });
    });
  });

  test("calls onFinish for rating selection", async () => {
    render(
      <ProductsFilters
        onFilterChange={mockOnFilterChange}
        onFinish={mockOnFinish}
      />
    );

    const addFiltersButton = screen.getByText(/Add Filters/i);
    userEvent.click(addFiltersButton);

    const radioGroup = screen.getByRole("radiogroup");
    const ratingInputs = screen.getAllByRole("radio", radioGroup);
    userEvent.click(ratingInputs[3]);

    const applyFiltersButton = screen.getByText(/Apply/i);
    userEvent.click(applyFiltersButton);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith(expect.objectContaining({ rating: 4 }));
    });
  });
});


describe("getFilteredProducts", () => {
  test("filters by name", async () => {
    const filters = { name: "Smartphone" };
    const result = await getFilteredProducts(filters);

    expect(result).toEqual([data[3]]);
  });

  test("filters by category", async () => {
    const filters = { category: ["Electronics"] };
    const result = await getFilteredProducts(filters);

    expect(result).toEqual([data[0], data[1], data[3]]);
  });

  test("filters by brand", async () => {
    const filters = { brand: ["Brand A"] };
    const result = await getFilteredProducts(filters);

    expect(result).toEqual([data[0]]);
  });

  test("filters by price range", async () => {
    const filters = { price: [100, 200] };
    const result = await getFilteredProducts(filters);
    
    expect(result).toEqual([data[4]]);
  });

  test("filters by rating", async () => {
    const filters = { rating: 4 };
    const result = await getFilteredProducts(filters);

    expect(result).toEqual([data[1], data[2]]);
  });

  test("filters by multiple criteria", async () => {
    const filters = { category: ["Electronics"], brand: ["Brand A"], price: [90, 200] };
    const result = await getFilteredProducts(filters);

    expect(result).toEqual([data[0]]);
  });

  test("returns all data when no filters are applied", async () => {
    const filters = {};
    const result = await getFilteredProducts(filters);

    expect(result).toEqual(data);
  });
});
