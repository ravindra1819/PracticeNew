import { useState, useEffect, useRef } from "react";
import Pagination from "./Pagination";
import './Style.css'
import RecipeModal from "./RecipeModal";

export default function MainPage() {
  const LIMIT = 10;
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const abortref = useRef(null)

  useEffect(() => {
    fetchData()
  }, [page, debouncedSearch])

  async function fetchData() {
    const skip = (page - 1) * LIMIT;

    abortref.current?.abort();
    const controller = new AbortController();
    abortref.current = controller;

    setLoading(true);
    setError(null);

    try {
      const url = debouncedSearch
        ? `https://dummyjson.com/recipes/search?q=${debouncedSearch}&limit=${LIMIT}&skip=${skip}`
        : `https://dummyjson.com/recipes?limit=${LIMIT}&skip=${skip}`;

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) {
        throw new Error("Failed to Fetch Data");
      }

      const result = await res.json();

      setData(result.recipes || []);
      setTotalCount(result.total || 0);

    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
        console.log("Error fetching Recipes:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(totalCount / LIMIT)

  return (
    <div className="container">
      <h2 className="title">🍽️ Recipes</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => {
            setPage(1); // reset page on search
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* 🔴 Error */}
      {error && (
        <div className="error">
          ❌ {error}
          <button onClick={fetchData}>Retry</button>
        </div>
      )}

      {/* ✅ Data */}
      {!loading && !error && (
        <div className="grid">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} className="image" />

              <div className="content">
                <h3>{item.name}</h3>
                <p><strong>Cuisine:</strong> {item.cuisine}</p>
                <p><strong>Rating:</strong> ⭐ {item.rating}</p>
                <p><strong>Cook Time:</strong> {item.cookTimeMinutes} mins</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedRecipe && <RecipeModal 
      recipe = {selectedRecipe}
      onClose = {() => setSelectedRecipe(null)}
      />}
      
    </div>
  )
}

function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debounced;
}