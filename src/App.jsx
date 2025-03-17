import { useState, useEffect } from "react";
import { FaSortAlphaDown } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=200");

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products);

        const specificCategories = ["All Categories",...new Set(data.products.map((product) => product.category))];
        setCategories(specificCategories);

      } catch (error) {
        setError("Error! Check your code!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);  

  const filteredProducts =
    selectedCategory === "all" ? products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products.filter((product) => product.category === selectedCategory &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="background-text">
          Designed by <a href="https://github.com/Giddymaster/Fetch-and-sort-products-by-category-api">Gideon Mwangi</a>
        </div>

        <h1>E-Commerce Shop</h1>

        {/* <button onClick={fetchProducts} disabled={loading}>
          {loading ? "Loading..." : "List all Products"}
        </button> */}

        {categories.length > 0 && (
          <div className="category">
            <label className="category-label">Sort <FaSortAlphaDown /> </label>
            <select className="select-category" value={selectedCategory} 
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
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;