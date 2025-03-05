import FilmList from "./FilmList";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router";

function MoviePage() {
  const location = useLocation();
  return (
    <>
      <SearchBar />
      {!location.search && <h1 className="trending--heading--text py-6 md:pt-[2.06rem] xl:pt-[2.13rem] xl:pb-[2.38rem]">Movies</h1>}
      <FilmList category={"Movie"} />
    </>
  );
}

export default MoviePage;
