import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// In ProductDetail.js
import { fetchProductByBarcode } from "../service/api";


const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await fetchProductByBarcode(barcode);
      setProduct(result.product);
    };

    fetchProduct();
  }, [barcode]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image_url} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <div className="detail-section">
        <h3>Ingredients</h3>
        <p>{product.ingredients_text || "N/A"}</p>
      </div>
      <div className="detail-section">
        <h3>Nutritional Values</h3>
        <p>Energy: {product.nutrition_data_per?.energy || "N/A"}</p>
        <p>Fat: {product.nutrition_data_per?.fat || "N/A"}</p>
        <p>Carbs: {product.nutrition_data_per?.carbohydrates || "N/A"}</p>
        <p>Proteins: {product.nutrition_data_per?.proteins || "N/A"}</p>
      </div>
      <div className="detail-section">
        <h3>Labels</h3>
        <p>{product.labels?.join(", ") || "N/A"}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
