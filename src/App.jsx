import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import SeriesPage from "./components/SeriesPage";
import BookmarkedPage from "./components/BookmarkedPage";
import { Route, Routes, Outlet, useSearchParams } from "react-router";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import { getAll } from "./helpers/get";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "./components/SomethingWentWrong";
import AdminPage from "./components/AdminPage";


function App() {
  const [error, setError] = useState("");
  const [allFilms, setAllFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);

  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem('currentRole');
    console.log(savedRole);
    return JSON.parse(savedRole);
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [searchResults, setSearchResults] = useState(searchQuery);

  const fetchData = async () => {
    try {
      const data = await getAll();
      setAllFilms(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResults(searchQuery);
  }, [searchQuery]);


  return (
    <>
      <ErrorBoundary fallback={<SomethingWentWrong />} resetKeys={[searchQuery]} onReset={() => {console.log("ErRRRRPRPPPPROROOROROOR")}}>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="login" element={<Login setRole={setRole}/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="somethingWentWrong" element={<SomethingWentWrong />}/>
          <Route
            path="/"
            element={
              <LayoutContext
                context={{
                  allFilms,
                  setAllFilms,
                  filteredFilms,
                  setFilteredFilms,
                  setSearchParams,
                  searchResults,
                  setSearchResults,
                  searchQuery,
                }}
                role={role}
            />
            }
          >
            <Route path="home" element={<HomePage />} />
            <Route path="movies" element={<MoviePage />} />
            <Route path="series" element={<SeriesPage />} />
            <Route path="bookmarked" element={<BookmarkedPage />} />
            <Route path="admin" element={<AdminPage />} />
        </Route>
        </Routes>
      </ErrorBoundary>
      {error && <p>{error}</p>}
    </>
  );
}

function LayoutContext({ context, role }) {
  return (
    <div>
      <Navbar role={role} />
      <div className="screen-spacing">
        <Outlet context={context} role={role} />
      </div>
    </div>
  );
}

export default App;
