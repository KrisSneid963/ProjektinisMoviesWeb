import { filterItems } from "../helpers/searchBar";
import { useLocation, useOutletContext } from "react-router";
import { useEffect } from "react";
import search from "../assets/icon-search.svg";

function SearchBar() {
  const {
    allFilms,
    setFilteredFilms,
    setSearchParams,
    searchResults,
    setSearchResults,
    searchQuery,
  } = useOutletContext();
  const location = useLocation();

  useEffect(() => {
    const filtered =
      searchResults.trim() === ""
        ? allFilms
        : filterItems(searchResults, allFilms);
    {
      setFilteredFilms(filtered);
    }
  }, [allFilms, setFilteredFilms, searchResults]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchResults(value);
    setSearchParams(value ? { search: value } : {});
  };

  const getPlaceholder = () => {
    switch (location.pathname) {
      case "/movies":
        return "Search for movies";
      case "/series":
        return "Search for TV series";
      case "/bookmarked":
        return "Search for bookmarked shows";
      default:
        return "Search for movies or TV series";
    }
  };

  const pattern = /^(?!\s)(?!.*\s$)[\x20-\x7E]*$/;
  let isValid = pattern.test(searchQuery);

  if (searchQuery && !isValid) {
    console.log();
    
    throw new Error("Invalid search query!");
  }

  return (
    <div className="search-container">
      <img src={search} alt="Search Icon" className="search-icon" />
      <input
        className="font-outfit search-bar"
        type="text"
        id="search"
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
        value={searchResults}
        maxLength={30}
      />
    </div>
  );
}

export default SearchBar;
