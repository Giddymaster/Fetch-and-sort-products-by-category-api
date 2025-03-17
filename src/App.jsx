import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.products);

      const specificCategories = ["All Categories", ...new Set(data.products.map((product) => product.category)),
      ];

      setCategories(specificCategories);
      
    } catch (error) {
      setError("Error! Check your code!", error);
    } finally {
      setLoading(false);
    }
  }


  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="main-container">
      
      <div className="hero-section">
      <div className="background-text">Designed by <a href="www.linkedin.com/in/gideon-mwangi">Gideon Mwangi</a></div>
        <h1>Fetch And Sort Products by Category</h1>

        <button onClick={fetchProducts} disabled={loading}>
        {loading ? "Loading..." : "Fetch Products"}
        </button>

        {categories.length > 0 && (
        <div className="category"> 
          <label className="category-label">Sort by Category:  </label>
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
      </div>

      <div className="products">
      <h3 className="products-title">Products:</h3>
      <p className="use-case"> {products.length === 0 && <p>Example:<b> Men Shoes -</b>  Puma Future Rider Trainers </p>} </p>
      <ol className="products-list">
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ol>
      </div>


      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
