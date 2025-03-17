import { useState, useEffect } from "react"; // Import useEffect

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products automatically when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products);

        // Extract categories from the data
        const specificCategories = [
          "All Categories",
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(specificCategories);
      } catch (error) {
        setError("Error! Check your code!");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter products by category and search query
  const filteredProducts =
    selectedCategory === "all"
      ? products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="background-text">
          Designed by <a href="www.linkedin.com/in/gideon-mwangi">Gideon Mwangi</a>
        </div>
        <h1>E-Commerce Shop</h1>

        {/* Remove the button */}
        {/* <button onClick={fetchProducts} disabled={loading}>
          {loading ? "Loading..." : "List all Products"}
        </button> */}

        {categories.length > 0 && (
          <div className="category">
            <label className="category-label">Sort by Category: </label>
            <select
              className="select-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="products">
        {loading ? (
          <p>Loading products...</p> 
        ) : error ? (
          <p className="error">{error}</p> 
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p> 
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-rating">
                  Rating: {product.rating} ⭐ ({product.reviews.length} reviews)
                </p>
                <p className="product-stock">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <div className="product-reviews">
                  <h4>Reviews:</h4>
                  {product.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <p>
                        <strong>{review.reviewerName}</strong> ({review.rating} ⭐)
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;