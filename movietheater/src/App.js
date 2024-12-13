import MovieCard from "./components/CardImage";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterCategory from "./components/filter";

const baseUrl = "http://localhost:5000/api"

function App() {
  const [movies, setMovies] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log('Selected Category ID:', categoryId);
  }

  useEffect(() => {
    const urlAllMovies = selectedCategory ? `${baseUrl}/moviesByCategory?id=${selectedCategory}` : `${baseUrl}/moviesByCategory`
    axios.get(urlAllMovies).then((response) => {
      setMovies(response.data.data);
    })
  }, [selectedCategory])

  if (!movies) return null

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SearchBar placeholder="Search for movies..." />
        <FilterCategory
          apiEndpoint={`${baseUrl}/categories`}
          onSelectCategory={handleCategorySelect}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <div className="row justify-content-center">
          {
            movies.map((item =>
              <MovieCard
                poster={item.poster}
                title={item.title}
                genre={item.categories}
                description={item.description}
                rating={item.rating}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
