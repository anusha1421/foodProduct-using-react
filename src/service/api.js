const API_BASE_URL = "https://world.openfoodfacts.org";

// Fetch products by category with pagination
export const fetchProductsByCategory = async (category, page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${category}.json?page=${page}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return { products: [] }; // Return an empty array in case of error
  }
};

// Fetch product by barcode
export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v0/product/${barcode}.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch product by barcode:", error);
    alert("An error occurred while fetching product details. Please try again.");
    return null;
  }
};

// Search products by name
export const searchProductsByName = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cgi/search.pl?search_terms=${query}&json=true`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Ensure data contains products
  } catch (error) {
    console.error("Failed to fetch products by name:", error);
    alert("An error occurred while fetching products. Please try again.");
    return { products: [] }; // Return empty products array in case of error
  }
};
