import React from "react";

export const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url || 'default-image.jpg'} alt={product.product_name} />
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <p>Category: {product.categories_tags?.join(", ") || "Unknown"}</p>
              <p>Nutrition Grade: {product.nutrition_grades || "N/A"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
