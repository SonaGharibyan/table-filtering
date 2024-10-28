import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ProductsTable } from "./components/products-table/ProductsTable";
import { ProductsFilters } from "./components/products-filters/ProductsFilters";
import { getFilteredProducts } from "./clients/productClient";

function App() {
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredProducts(filters).then((data) => {
      setIsLoading(false);
      setFilteredProducts(data);
    });
  }, [JSON.stringify(filters)]);

  const onFilterChange = useCallback((key, value) => {
    setFilters((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  return (
    <>
      <ProductsFilters onFilterChange={onFilterChange} onFinish={setFilters}/>
      <ProductsTable data={filteredProducts} isLoading={isLoading} />
    </>
  );
}

export default App;
