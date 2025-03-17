# Fetch and Sort products by category api

I used this api to fetch 100 products -- [https://dummyjson.com/products?limit=100] -- and allows the user to filter the products by category  

## Filtering Logic

Extracts unique categories from the products  
 Use `new Set()` to remove duplicates and add "All Categories" as the first option  

```js
      const specificCategories = [
        "All Categories",
        ...new Set(data.products.map((product) => product.category)),
      ];
```

Update the categories state with the extracted categories  

```js
    setCategories(specificCategories);
    } catch (error) {
      // Handle errors by setting an error message
      setError("Error! Check your code!", error);
    } finally {
      // Set loading to false once the fetch operation is complete (success or failure)
      setLoading(false);
    }
  }
```

Filter products based on the selected category
If "all" is selected, return all products; otherwise, filter by the selected category

```js
  const filteredProducts =
    selectedCategory === "all"? products: products.filter((product) => product.category === selectedCategory);

```

### Rendering

A dropdown allows the user to select a category.  
The filteredProducts are displayed in a list.  
Error messages are displayed if there’s an error.  
