import React from "react";
import "../../matchMedia.mock";
import { render, screen, within } from "@testing-library/react";
import { ProductsTable } from "./ProductsTable";
import data from "../../data.json";

describe("ProductsTable", () => {
  beforeEach(() => {});

  test("renders Products Table component", () => {
    render(<ProductsTable data={data} />);
    expect(
      screen.getByRole("columnheader", { name: /Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Category/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Brand/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Price/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Rating/i })
    ).toBeInTheDocument();
  });

  test("displays no data indicator", async () => {
    render(<ProductsTable data={[]} />);

    expect(screen.getByText(/No Data/i)).toBeInTheDocument();
  });

  test("displays Loading indicator", () => {
    render(<ProductsTable data={[]} isLoading={true} />);

    expect(screen.getByLabelText(/Loading/i)).toBeInTheDocument();
  });

  test("displays the correct data in the table", () => {
    render(<ProductsTable data={data} isLoading={false} />);

    const rowGroups = screen.getAllByRole("rowgroup");
    const rows = within(rowGroups[1]).getAllByRole("row");
    expect(rows).toHaveLength(data.length);

    data.forEach((item, index) => {
      const cells = within(rows[index]).getAllByRole("cell");

      expect(within(cells[0]).getByText(item.name)).toBeInTheDocument();
      expect(within(cells[1]).getByText(item.category)).toBeInTheDocument();
      expect(within(cells[2]).getByText(item.brand)).toBeInTheDocument();
      expect(within(cells[3]).getByText(item.price)).toBeInTheDocument();
      expect(within(cells[4]).getByText(item.rating)).toBeInTheDocument();
    });
  });
});
