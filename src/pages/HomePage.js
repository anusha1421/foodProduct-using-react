import React, { useState, useEffect } from "react";
import { fetchProductsByCategory, searchProductsByName } from "../service/api";
import { ProductList } from "../Components/productlist";
import SearchBar from "../Components/SearchBar";
import CategoryFilter from "../Components/CategoryFilter";
import SortDropdown from "../Components/SortDropdown";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Beverages");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  const fetchProducts = async () => {
    try {
      let result;
      if (searchQuery) {
        result = await searchProductsByName(searchQuery);
        setProducts(result.products);
      } else {
        result = await fetchProductsByCategory(category, page);
        setProducts((prevProducts) => [...prevProducts, ...result.products]);
      }

      if (result.products.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setProducts([]);
    fetchProducts();
  }, [category, searchQuery]);

  const fetchMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
    fetchProducts();
  };

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    if (option === "name-asc") {
      sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (option === "name-desc") {
      sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (option === "grade-asc") {
      sortedProducts.sort((a, b) => a.nutrition_grade_fr.localeCompare(b.nutrition_grade_fr));
    } else if (option === "grade-desc") {
      sortedProducts.sort((a, b) => b.nutrition_grade_fr.localeCompare(a.nutrition_grade_fr));
    }
    setProducts(sortedProducts);
  };

  const handleSortChange = (criteria) => {
    setSortOption(criteria);
    sortProducts(criteria);
  };

  return (
    <div className="homepage container">
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <CategoryFilter categories={["Beverages", "Snacks"]} onSelectCategory={setCategory} />
      <SortDropdown onSort={handleSortChange} />
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <ProductList products={products} />
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
